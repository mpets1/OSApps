import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Settings from './components/Settings';

function App() {
  const [apps, setApps] = useState([]);
  const [filteredApps, setFilteredApps] = useState([]);
  const [category, setCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [installedApps, setInstalledApps] = useState(new Set());
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [installProgress, setInstallProgress] = useState({});

  useEffect(() => {
    loadApps();
    loadInstalledApps();
    
    // Listen for installation progress updates
    window.electron.onInstallProgress((data) => {
      setInstallProgress(prev => ({
        ...prev,
        [data.appId]: data,
      }));
    });
  }, []);

  const loadApps = async () => {
    try {
      const appList = await window.electron.getApps();
      setApps(appList);
      setFilteredApps(appList);
    } catch (error) {
      console.error('Failed to load apps:', error);
    }
  };

  const loadInstalledApps = async () => {
    try {
      const installed = await window.electron.getInstalledApps();
      setInstalledApps(new Set(installed));
    } catch (error) {
      console.error('Failed to load installed apps:', error);
    }
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    filterApps(newCategory, searchTerm);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    filterApps(category, term);
  };

  const filterApps = (cat, search) => {
    let filtered = apps;

    if (cat !== 'all') {
      filtered = filtered.filter(app => app.category === cat);
    }

    if (search) {
      filtered = filtered.filter(app =>
        app.name.toLowerCase().includes(search.toLowerCase()) ||
        app.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredApps(filtered);
  };

  const handleInstall = async (app) => {
    try {
      setInstallProgress(prev => ({
        ...prev,
        [app.id]: { appId: app.id, progress: 0, message: 'Preparing...' },
      }));

      const result = await window.electron.installApp(app);
      
      if (result.success) {
        setInstalledApps(new Set([...installedApps, app.id]));
        setTimeout(() => {
          setInstallProgress(prev => {
            const updated = { ...prev };
            delete updated[app.id];
            return updated;
          });
        }, 2000);
      }
    } catch (error) {
      console.error('Installation failed:', error);
    }
  };

  const handleUninstall = async (appId) => {
    try {
      const result = await window.electron.uninstallApp(appId);
      
      if (result.success) {
        const newInstalled = new Set(installedApps);
        newInstalled.delete(appId);
        setInstalledApps(newInstalled);
      }
    } catch (error) {
      console.error('Uninstallation failed:', error);
    }
  };

  return (
    <div className="app">
      <Header 
        onSearch={handleSearch}
        onSettingsClick={() => setSettingsOpen(true)}
      />
      <div className="app-container">
        <Sidebar 
          category={category} 
          onCategoryChange={handleCategoryChange}
        />
        <MainContent 
          apps={filteredApps}
          installedApps={installedApps}
          installProgress={installProgress}
          onInstall={handleInstall}
          onUninstall={handleUninstall}
        />
      </div>
      <Settings 
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </div>
  );
}

export default App;
