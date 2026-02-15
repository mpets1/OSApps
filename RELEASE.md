# Release Guide for OSApps

Quick reference for creating and publishing OSApps releases.

## Quick Build Commands

### Windows Command Prompt (cmd)
```cmd
build.bat
```

### Windows PowerShell
```powershell
.\build.ps1 -Target all
```

### npm (all platforms)
```bash
# Build both installer and portable
npm run build

# Build specific type
npm run build:nsis       # NSIS Installer only
npm run build:portable   # Portable EXE only
npm run build:win        # All Windows targets
```

## Release Steps

### 1. Prepare Code

```bash
# Ensure code is clean and committed
git status
git add .
git commit -m "Release v1.0.0"
```

### 2. Update Version

Edit `package.json`:
```json
{
  "version": "1.0.0"
}
```

### 3. Build Installer

**Option A: Manual Build**
```bash
npm run build
```

**Option B: Interactive Build (Windows)**
```cmd
build.bat
```

**Option C: PowerShell with Options**
```powershell
.\build.ps1 -Target all
```

### 4. Test Installers

Before releasing:
1. Download `OSApps-X.X.X-Setup.exe` from `dist/`
2. Run installer and verify:
   - Installation wizard appears
   - App installs correctly
   - Desktop shortcut created
   - Start menu entry created
   - App launches successfully
3. Uninstall and verify cleanup

### 5. Create GitHub Release

Via GitHub Web UI:
1. Go to [Releases](https://github.com/mpets1/OSApps/releases)
2. Click "Draft a new release"
3. **Tag version:** `v1.0.0`
4. **Release title:** `Release v1.0.0`
5. **Description:** (add release notes)
6. **Attach files:**
   - `OSApps-1.0.0-Setup.exe`
   - `OSApps-1.0.0-Portable.exe`
7. Click "Publish release"

### 6. Automated Release (GitHub Actions)

Push tag to trigger automatic build:
```bash
git tag v1.0.0
git push origin v1.0.0
```

GitHub Actions will:
- ✅ Build on Windows runner
- ✅ Create installers
- ✅ Upload to release automatically

## Release Checklist

- [ ] Code changes completed and tested
- [ ] Version number updated in `package.json`
- [ ] Changelog/Release notes prepared
- [ ] All dependencies updated (`npm update`)
- [ ] Code builds without errors (`npm run build`)
- [ ] Installers tested on clean Windows system
- [ ] GitHub Release created with both files:
  - [ ] NSIS Setup installer
  - [ ] Portable executable
- [ ] Release notes published
- [ ] Users notified of new release

## File Naming Convention

Follow this pattern for consistency:

```
OSApps-{VERSION}-{TYPE}.exe

Examples:
OSApps-1.0.0-Setup.exe      (NSIS Installer)
OSApps-1.0.0-Portable.exe   (Portable)
```

## Release Notes Template

```markdown
# Release v1.0.0

## 🎉 Features
- Feature 1 description
- Feature 2 description

## 🐛 Bug Fixes
- Bug fix 1
- Bug fix 2

## 📝 Changes
- Change 1
- Change 2

## 📥 Downloads

- **Installer**: OSApps-1.0.0-Setup.exe (Recommended)
- **Portable**: OSApps-1.0.0-Portable.exe (No installation needed)

## ⚙️ System Requirements

- Windows 7 or later
- 200MB disk space
- Internet connection for app downloads

## 🙏 Thanks

Thanks to all contributors and users!
```

## Troubleshooting

### "Build command not found"
- Ensure Node.js is installed: `node --version`
- Run from project root directory
- Try: `npm run build` instead of `build.bat`

### Installer won't create
- Delete existing `dist/` folder
- Check disk space (need ~500MB)
- Run full clean build
- Check for antivirus interference

### Build succeeds but no files in dist/
- Verify electron-builder installed: `npm list electron-builder`
- Run: `npm install` to reinstall
- Try: `npx electron-builder --list-targets`

### GitHub Actions build failed
- Check Actions tab for error logs
- Verify `.github/workflows/build.yml` exists
- Ensure `GITHUB_TOKEN` has proper permissions

## Version Management

Follow [Semantic Versioning](https://semver.org/):

```
MAJOR.MINOR.PATCH

1.0.0 = Initial release
1.1.0 = New features (backward compatible)
1.1.1 = Bug fix patch
2.0.0 = Breaking changes
```

## Announcements

After release, announce in:
- GitHub Release page
- README.md (update latest version)
- GitHub Issues/Discussions
- Social media/forums (if applicable)

---

**Last Updated:** February 2026
**Maintained By:** OSApps Team
