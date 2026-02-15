import React from 'react';
import { FiDownload, FiTrash2, FiExternalLink, FiLoader } from 'react-icons/fi';

function AppCard({ app, isInstalled, installProgress, onInstall, onUninstall }) {
  const getIconEmoji = (category) => {
    const emojiMap = {
      development: '💻',
      productivity: '📊',
      graphics: '🎨',
      media: '🎬',
      utilities: '🛠️',
      games: '🎮',
      education: '📚',
      system: '⚙️',
    };
    return emojiMap[category] || '📦';
  };

  const progress = installProgress?.[app.id];
  const isInstalling = progress && progress.progress < 100;

  return (
    <div className="app-card">
      <div className="app-icon">
        {getIconEmoji(app.category)}
      </div>
      <div className="app-details">
        <h2 className="app-name">{app.name}</h2>
        <p className="app-description">{app.description}</p>
        <div className="app-meta">
          <span>{app.category}</span>
          <span>⭐ {app.rating || 'N/A'}</span>
        </div>

        {isInstalling && (
          <div className="install-progress">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progress.progress}%` }}
              />
            </div>
            <p className="progress-text">
              <FiLoader size={14} className="spinner" /> {progress.message}
            </p>
          </div>
        )}

        <div className="app-actions">
          {isInstalled ? (
            <>
              <button className="btn btn-installed" disabled>
                <FiDownload size={16} />
                Installed
              </button>
              <button
                className="btn btn-uninstall"
                onClick={() => onUninstall(app.id)}
                disabled={isInstalling}
              >
                <FiTrash2 size={16} />
              </button>
            </>
          ) : (
            <button
              className="btn btn-install"
              onClick={() => onInstall(app)}
              disabled={isInstalling}
            >
              {isInstalling ? (
                <>
                  <FiLoader size={16} className="spinner" />
                  Installing...
                </>
              ) : (
                <>
                  <FiDownload size={16} />
                  Install
                </>
              )}
            </button>
          )}
          <a
            href={app.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
            style={{
              background: '#f0f0f0',
              color: '#333',
              flex: 0.4,
              textDecoration: 'none',
            }}
          >
            <FiExternalLink size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default AppCard;
