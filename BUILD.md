# Building OSApps Installer

This guide explains how to build the OSApps installer for Windows releases.

## Prerequisites

- **Node.js** 14+ and npm
- **Windows** (for building Windows installers)
- **Git**

## Local Build Setup

### 1. Install Dependencies

```bash
npm install
```

This will install all required dependencies including:
- React 18 and ReactDOM
- Electron 27
- Electron Builder
- All development tools

### 2. Build Options

#### Build Both Installer and Portable

Creates both NSIS installer (.exe) and portable executable:

```bash
npm run build
```

This will:
1. Build the React app to `build/` directory
2. Package with Electron
3. Create both `.exe` installer and `.exe` portable versions
4. Output files to `dist/` directory

#### Build NSIS Installer Only

Creates professional installer with setup wizard:

```bash
npm run build:nsis
```

**Output:** `OSApps-<version>-Setup.exe`

#### Build Portable Executable Only

Creates standalone executable (no installation needed):

```bash
npm run build:portable
```

**Output:** `OSApps-<version>-Portable.exe`

#### Build All Windows Targets

```bash
npm run build:win
```

## Output Files

Build artifacts are created in the `dist/` directory:

```
dist/
├── OSApps-1.0.0-Setup.exe          # NSIS Installer
├── OSApps-1.0.0-Portable.exe       # Portable executable
└── builder-effective-config.yaml   # Build config (for reference)
```

### File Size Reference

- **NSIS Installer**: ~120-150 MB (includes all dependencies)
- **Portable EXE**: ~100-130 MB (standalone executable)

## Release Process

### Manual Release

1. Build the installer locally:
   ```bash
   npm run build
   ```

2. Create a GitHub release:
   - Go to [Releases](https://github.com/mpets1/OSApps/releases)
   - Click "Draft a new release"
   - Tag: `v1.0.0` (follow semantic versioning)
   - Upload files from `dist/` folder:
     - `OSApps-1.0.0-Setup.exe`
     - `OSApps-1.0.0-Portable.exe`
   - Write release notes
   - Publish

### Automated Release with GitHub Actions

1. Create a tag and push:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

2. GitHub Actions automatically:
   - Builds the app on Windows runners
   - Creates installers
   - Uploads to GitHub Releases

**Note:** Ensure `.github/workflows/build.yml` is configured correctly.

## Building Multiple Versions

For different version numbers, update `package.json`:

```json
{
  "version": "1.1.0"
}
```

Then build and the version will be included in filenames.

## Troubleshooting

### Build fails with "No such file or directory"

Ensure all dependencies are installed:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Installer appears corrupted

- Check disk space (need ~500MB free)
- Delete `dist/` and `build/` directories
- Run full build again: `npm run build`

### Files larger than expected

This is normal because Electron bundles Chromium. To reduce size:
- Remove unnecessary dependencies from `package.json`
- Use `--strip` flag with electron-builder (requires signing certificate)

### "NSIS not found" error

NSIS is automatically built into electron-builder. If error persists:
```bash
npm install -g nsis
npm run build
```

## Installer Features

The generated NSIS installer includes:

✅ **Professional Setup Wizard**
- Custom installation directory selection
- Desktop shortcut creation
- Start menu integration
- Uninstall program in Control Panel

✅ **Auto-Launch**
- Option to launch app after installation

✅ **Uninstaller**
- Clean removal from Control Panel
- Removes all app data

## Development Build

For testing without creating full installer:

```bash
npm start
```

This runs the development server with hot reload for faster iteration.

## CI/CD Integration

### GitHub Actions

The included workflow (`.github/workflows/build.yml`) automatically:
- Runs on tag push
- Builds on Windows runner
- Uploads artifacts to releases

### Other CI Systems

For Azure Pipelines, GitLab CI, etc., adapt these steps:

```yaml
- Install Node.js
- npm install
- npm run react-build
- npx electron-builder --win
- Upload dist/* to artifacts
```

## Code Signing

For production releases, code signing is recommended:

1. Obtain Windows code signing certificate
2. Set environment variables:
   ```bash
   set CSC_LINK=path/to/certificate.pfx
   set CSC_KEY_PASSWORD=your_password
   ```
3. Build: `npm run build`

**Note:** Without signing, users will see "Unknown Publisher" warning on install.

## App Updates

To implement auto-updates in the future:

1. Add `electron-updater` to dependencies
2. Configure update server
3. Modify Electron main process to check for updates
4. Publish new releases with update manifests

See [electron-updater docs](https://www.electron.build/auto-update) for details.

## Support

For build issues:
- Check [Electron Builder docs](https://www.electron.build/)
- Review [GitHub Issues](https://github.com/mpets1/OSApps/issues)
- Check system requirements

---

**Last Updated:** February 2026
