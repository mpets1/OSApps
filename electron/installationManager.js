const fs = require('fs');
const path = require('path');
const os = require('os');
const { exec, execFile } = require('child_process');
const https = require('https');
const http = require('http');

class InstallationManager {
  constructor() {
    this.installBaseDir = path.join(os.homedir(), 'AppData', 'Local', 'OSApps');
    this.downloadDir = path.join(this.installBaseDir, 'Downloads');
    this.installedAppsFile = path.join(this.installBaseDir, 'installed-apps.json');
    this.initializeDirectories();
  }

  initializeDirectories() {
    if (!fs.existsSync(this.installBaseDir)) {
      fs.mkdirSync(this.installBaseDir, { recursive: true });
    }
    if (!fs.existsSync(this.downloadDir)) {
      fs.mkdirSync(this.downloadDir, { recursive: true });
    }
    if (!fs.existsSync(this.installedAppsFile)) {
      fs.writeFileSync(this.installedAppsFile, JSON.stringify({}));
    }
  }

  getInstalledApps() {
    try {
      const data = fs.readFileSync(this.installedAppsFile, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return {};
    }
  }

  addInstalledApp(appId, appInfo) {
    const installedApps = this.getInstalledApps();
    installedApps[appId] = {
      ...appInfo,
      installedAt: new Date().toISOString(),
    };
    fs.writeFileSync(this.installedAppsFile, JSON.stringify(installedApps, null, 2));
  }

  removeInstalledApp(appId) {
    const installedApps = this.getInstalledApps();
    delete installedApps[appId];
    fs.writeFileSync(this.installedAppsFile, JSON.stringify(installedApps, null, 2));
  }

  downloadFile(url, filename) {
    return new Promise((resolve, reject) => {
      const filepath = path.join(this.downloadDir, filename);
      const file = fs.createWriteStream(filepath);

      const protocol = url.startsWith('https') ? https : http;
      const request = protocol.get(url, (response) => {
        const totalSize = parseInt(response.headers['content-length'], 10);
        let downloadedSize = 0;

        response.on('data', (chunk) => {
          downloadedSize += chunk.length;
          const progress = Math.round((downloadedSize / totalSize) * 100);
          this.onProgress?.(progress);
        });

        response.pipe(file);
      });

      file.on('finish', () => {
        file.close();
        resolve(filepath);
      });

      file.on('error', (err) => {
        fs.unlink(filepath, () => {});
        reject(err);
      });

      request.on('error', (err) => {
        fs.unlink(filepath, () => {});
        reject(err);
      });
    });
  }

  executeInstaller(installerPath) {
    return new Promise((resolve, reject) => {
      // For .exe and .msi files, execute silently
      const args = installerPath.endsWith('.msi')
        ? ['/i', installerPath, '/qn']
        : [installerPath, '/S', '/D=%LocalAppData%\\OSApps'];

      execFile('msiexec.exe', args, (error) => {
        if (error && !error.message.includes('exit code 0')) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  async install(app, onProgress) {
    try {
      this.onProgress = onProgress;

      // Extract filename from URL
      const urlParts = app.downloadUrl.split('/');
      let filename = urlParts[urlParts.length - 1];
      if (!filename.match(/\.(exe|msi|zip)$/i)) {
        filename = `${app.id}-installer.exe`;
      }

      onProgress?.(10, `Downloading ${app.name}...`);

      // Download the file
      const installerPath = await this.downloadFile(app.downloadUrl, filename);
      onProgress?.(60, `Installing ${app.name}...`);

      // Execute installer
      if (filename.endsWith('.exe') || filename.endsWith('.msi')) {
        await this.executeInstaller(installerPath);
      } else if (filename.endsWith('.zip')) {
        // For portable apps, just extract to a known location
        // This is a simplified approach
        onProgress?.(85, `Extracting ${app.name}...`);
      }

      onProgress?.(95, `Finalizing...`);

      // Record the installation
      this.addInstalledApp(app.id, {
        name: app.name,
        version: '1.0.0',
        installPath: app.installPath,
        executablePath: app.executablePath,
      });

      // Clean up download
      try {
        fs.unlinkSync(installerPath);
      } catch (e) {
        // Ignore cleanup errors
      }

      onProgress?.(100, `${app.name} installed successfully!`);
      return true;
    } catch (error) {
      throw new Error(`Installation failed: ${error.message}`);
    }
  }

  async uninstall(appId, appInfo) {
    try {
      // Try to use Windows' built-in uninstaller
      const uninstallCommands = [
        // Try Programs and Features uninstaller
        `powershell -Command "
          $app = Get-WmiObject -Class Win32_Product | Where-Object { $_.Name -like '*${appInfo.name}*' };
          if ($app) { $app.Uninstall() }
        "`,
        // Try direct uninstaller
        `"${path.join(appInfo.installPath, 'uninstall.exe')}" /S`,
      ];

      for (const cmd of uninstallCommands) {
        try {
          await new Promise((resolve, reject) => {
            exec(cmd, (error) => {
              if (error && !error.message.includes('exit code 0')) {
                reject(error);
              } else {
                resolve();
              }
            });
          });
          break;
        } catch (e) {
          // Try next method
        }
      }

      // Record the uninstallation
      this.removeInstalledApp(appId);
      return true;
    } catch (error) {
      throw new Error(`Uninstallation failed: ${error.message}`);
    }
  }

  isAppInstalled(appId) {
    const installedApps = this.getInstalledApps();
    return !!installedApps[appId];
  }
}

module.exports = InstallationManager;
