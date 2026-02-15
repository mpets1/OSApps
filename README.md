# OSApps

The Open Source No Garbage App Store for Windows. A modern Electron-based application store that provides easy discovery and management of the best open source software available.

## 🎯 Features

- **Browse Open Source Apps**: Discover hundreds of vetted open source applications
- **Search & Filter**: Powerful search with category filtering
- **One-Click Installation**: Easy app installation and management
- **Modern UI**: Beautiful, responsive interface built with React
- **No Bloatware**: Curated collection of quality open source tools
- **Multiple Categories**: 
  - Development tools (VS Code, Git, Node.js, etc.)
  - Productivity (LibreOffice, Thunderbird, Nextcloud, etc.)
  - Graphics & Design (Blender, Inkscape, GIMP, Krita)
  - Media & Audio (VLC, Audacity, FFmpeg, OBS)
  - Utilities (Firefox, 7-Zip, WireGuard)
  - Education (Anki, Moodle, Greenfoot)
  - System Tools (Kubernetes, Docker, OpenSSH)
  - Games (Godot Engine)

## 📋 Requirements

- Node.js 14+ and npm
- Windows 7 or later (for installer)
- 200MB disk space for installation

## 🚀 Getting Started

### Installation

Download the latest release from [GitHub Releases](https://github.com/mpets1/OSApps/releases):

- **OSApps-X.X.X-Setup.exe** - NSIS Installer (recommended)
  - Professional setup wizard
  - Desktop shortcut creation
  - Start menu integration
  - Automatic uninstall support

- **OSApps-X.X.X-Portable.exe** - Portable Version
  - No installation required
  - Run directly from download
  - Great for USB drives

### From Source

```bash
# Clone the repository
git clone https://github.com/mpets1/OSApps.git
cd OSApps

# Install dependencies
npm install

# Start development
npm start
```

### Building the Installer

```bash
# Build both installer and portable versions
npm run build

# Build only NSIS installer
npm run build:nsis

# Build only portable executable
npm run build:portable
```

See [BUILD.md](BUILD.md) for detailed building instructions.

## 📁 Project Structure

```
OSApps/
├── electron/              # Electron main process
│   ├── main.js           # App entry point
│   └── preload.js        # IPC bridge
├── src/                  # React app source
│   ├── components/       # React components
│   ├── App.js           # Main App component
│   ├── App.css          # Main styles
│   └── index.js         # React entry point
├── public/              # Static assets
│   └── index.html       # HTML template
├── data/                # App database
│   └── apps.json        # Open source apps catalog
└── package.json         # Project configuration
```

## 🧩 Available Components

- **Header**: Search bar and app title
- **Sidebar**: Category navigation
- **MainContent**: App grid display
- **AppCard**: Individual app card with install/uninstall buttons

## 📦 Available Apps

The catalog includes 40+ popular open source applications including:

### Development
- Visual Studio Code
- Python
- Node.js
- Git
- Docker
- Kubernetes
- GCC
- MySQL
- PostgreSQL
- Redis
- Apache HTTP Server
- Nginx

### Graphics & Design
- Blender
- Inkscape
- GIMP
- Krita
- FreeCAD

### Media & Audio
- VLC Media Player
- Audacity
- FFmpeg
- OBS Studio

### Productivity
- LibreOffice
- Thunderbird
- Logseq
- Nextcloud
- Zotero
- Calibre
- WordPress

### And many more...

## 🔧 Tech Stack

- **Frontend**: React 18
- **Desktop**: Electron 27
- **Styling**: CSS3
- **Icons**: React Icons
- **Build Tool**: Electron Builder
- **Backend**: IPC (Inter-Process Communication)

## 📝 Adding New Apps

To add new apps to the catalog, edit `data/apps.json`:

```json
{
  "id": "unique-app-id",
  "name": "App Name",
  "description": "Brief description of the app",
  "category": "category-name",
  "url": "https://github.com/...",
  "rating": "4.8",
  "license": "MIT",
  "downloads": "10M+"
}
```

### Supported Categories
- `development`
- `productivity`
- `graphics`
- `media`
- `utilities`
- `games`
- `education`
- `system`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## ⭐ Support

If you find this project useful, please consider giving it a star on GitHub!

---

**Made with ❤️ for the open source community**
