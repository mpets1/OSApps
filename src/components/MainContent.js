import React from 'react';
import { FiDownload, FiTrash2 } from 'react-icons/fi';
import AppCard from './AppCard';

function MainContent({ apps, installedApps, installProgress, onInstall, onUninstall }) {
  if (apps.length === 0) {
    return (
      <div className="main-content">
        <div className="empty-state">
          <div className="empty-state-icon">📦</div>
          <p className="empty-state-text">No apps found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content">
      <div className="content-header">
        <h1 className="content-title">Open Source Applications</h1>
        <p className="content-subtitle">
          {apps.length} {apps.length === 1 ? 'app' : 'apps'} available
        </p>
      </div>
      <div className="apps-grid">
        {apps.map((app) => (
          <AppCard
            key={app.id}
            app={app}
            isInstalled={installedApps.has(app.id)}
            installProgress={installProgress}
            onInstall={onInstall}
            onUninstall={onUninstall}
          />
        ))}
      </div>
    </div>
  );
}

export default MainContent;
