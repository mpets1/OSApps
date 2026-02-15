const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  getApps: () => ipcRenderer.invoke('get-apps'),
  getInstalledApps: () => ipcRenderer.invoke('get-installed-apps'),
  installApp: (app) => ipcRenderer.invoke('install-app', app),
  uninstallApp: (appId) => ipcRenderer.invoke('uninstall-app', appId),
  onInstallProgress: (callback) => {
    ipcRenderer.on('install-progress', (event, data) => {
      callback(data);
    });
  },
});
