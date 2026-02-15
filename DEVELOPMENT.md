# OSApps Development Guide

This guide covers advanced features and customization of OSApps.

## Architecture Overview

### Directory Structure

```
OSApps/
├── electron/              # Electron main process
│   ├── main.js           # App initialization and IPC handlers
│   └── preload.js        # Security boundary for IPC
├── src/
│   ├── components/
│   │   ├── Header.js     # Search and settings
│   │   ├── Sidebar.js    # Category navigation
│   │   ├── MainContent.js # App grid display
│   │   ├── AppCard.js    # Individual app card
│   │   └── Settings.js   # Settings modal
│   ├── App.js            # Main React component
│   └── App.css           # Global styles
├── data/
│   └── apps.json         # App catalog
└── public/
    └── index.html        # HTML template
```

## IPC Communication

The app uses Electron's IPC (Inter-Process Communication) for secure communication between the React app and Electron main process.

### Available IPC Handlers

**Main Process → Renderer:**

```javascript
// Get all apps
const apps = await window.electron.getApps();

// Install an app
const result = await window.electron.installApp(appId);

// Uninstall an app
const result = await window.electron.uninstallApp(appId);
```

### Adding New IPC Handlers

1. Add handler in `electron/main.js`:
```javascript
ipcMain.handle('your-action', async (event, args) => {
  // Your logic here
  return result;
});
```

2. Expose in `electron/preload.js`:
```javascript
contextBridge.exposeInMainWorld('electron', {
  yourAction: (args) => ipcRenderer.invoke('your-action', args),
});
```

3. Use in React components:
```javascript
const result = await window.electron.yourAction(args);
```

## Customization

### Adding New Categories

Edit `src/components/Sidebar.js`:

```javascript
const categories = [
  { id: 'your-category', label: 'Your Category Label' },
  // ...
];
```

And update `App` component icon mapping in `AppCard.js`:

```javascript
const emojiMap = {
  'your-category': '🎯',
  // ...
};
```

### Styling

- Global styles: `src/App.css`
- Component structure uses BEM-style classes
- Color scheme uses gradients: `#667eea` to `#764ba2`
- Responsive design with media queries

### Adding More App Details

Extend the app schema in `data/apps.json`:

```json
{
  "id": "app-id",
  "name": "App Name",
  "description": "...",
  "category": "...",
  "url": "...",
  "rating": "4.8",
  "license": "MIT",
  "downloads": "10M+",
  "author": "Author Name",
  "repository": "https://github.com/...",
  "homepage": "https://...",
  "tags": ["tag1", "tag2"],
  "features": ["feature1", "feature2"]
}
```

Then update `AppCard.js` to display these fields.

## Performance Optimization

### Code Splitting

Use React.lazy() for components:

```javascript
const Settings = React.lazy(() => import('./components/Settings'));
```

### Memoization

Use memo for AppCard to prevent unnecessary re-renders:

```javascript
export default React.memo(AppCard);
```

## Building for Different Platforms

Currently configured for Windows. To add support for other platforms:

1. Edit `package.json` build configuration
2. Add platform-specific targets
3. Update main.js for platform-specific paths

Example for macOS:

```json
"mac": {
  "target": ["dmg", "zip"],
  "category": "public.app-category.utilities"
}
```

## Troubleshooting

### App won't start

- Check Node.js version (14+)
- Clear node_modules: `rm -rf node_modules && npm install`
- Check for port conflicts (React dev server runs on 3000)

### IPC not working

- Verify preload.js is loaded in BrowserWindow
- Check contextBridge.exposeInMainWorld calls
- Ensure handlers are defined in main.js

### Build errors

- Clear build artifacts: `rm -rf build dist`
- Ensure all dependencies installed: `npm install`
- Check Electron version compatibility

## Future Enhancements

Potential features to add:

- [ ] App ratings and reviews
- [ ] Favorites/bookmarks
- [ ] Installation progress tracking
- [ ] Auto-update checking
- [ ] Custom app sources
- [ ] Offline mode
- [ ] Dark theme
- [ ] App recommendations
- [ ] Community-contributed apps
- [ ] CLI integration

## Resources

- [Electron Documentation](https://www.electronjs.org/docs)
- [React Documentation](https://react.dev)
- [Electron Builder](https://www.electron.build)
- [Open Source Licenses](https://opensource.org/licenses)

## Getting Help

- Create an issue on GitHub
- Check existing issues and discussions
- Review the README and Contributing guides

---

Happy coding! 🚀
