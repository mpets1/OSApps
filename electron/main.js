const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');
const isDev = process.env.REACT_APP_DEV === 'true' || process.argv.includes('--dev');
const InstallationManager = require('./installationManager');

const installationManager = new InstallationManager();
let mainWindow;
let installProgressWindow = null;

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  const startUrl = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`;

  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// IPC Handlers
ipcMain.handle('get-apps', async () => {
  const apps = require('../data/apps.json');
  return apps;
});

ipcMain.handle('get-installed-apps', async () => {
  const installedApps = installationManager.getInstalledApps();
  return Object.keys(installedApps);
});

ipcMain.handle('install-app', async (event, app) => {
  try {
    return await new Promise((resolve, reject) => {
      installationManager.install(app, (progress, message) => {
        mainWindow.webContents.send('install-progress', {
          appId: app.id,
          progress,
          message,
        });
      })
        .then(() => resolve({ success: true, appId: app.id }))
        .catch((error) => reject(error));
    });
  } catch (error) {
    console.error('Installation error:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('uninstall-app', async (event, appId) => {
  try {
    const installedApps = installationManager.getInstalledApps();
    const appInfo = installedApps[appId];
    
    if (!appInfo) {
      throw new Error('App not found in installed apps');
    }

    await installationManager.uninstall(appId, appInfo);
    return { success: true, appId };
  } catch (error) {
    console.error('Uninstallation error:', error);
    return { success: false, error: error.message };
  }
});

// Require electron-squirrel-startup to handle installer events
require('electron-squirrel-startup');
