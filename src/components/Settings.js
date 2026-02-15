import React, { useState } from 'react';
import { FiSettings, FiX } from 'react-icons/fi';

function Settings({ isOpen, onClose }) {
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState(true);
  const [autoUpdate, setAutoUpdate] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Settings</h2>
          <button className="modal-close" onClick={onClose}>
            <FiX size={24} />
          </button>
        </div>

        <div className="modal-body">
          <div className="settings-section">
            <h3>Appearance</h3>
            <div className="setting-item">
              <label>Theme</label>
              <select 
                value={theme} 
                onChange={(e) => setTheme(e.target.value)}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </select>
            </div>
          </div>

          <div className="settings-section">
            <h3>Notifications</h3>
            <div className="setting-item">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                />
                <span>Enable Notifications</span>
              </label>
            </div>
          </div>

          <div className="settings-section">
            <h3>Updates</h3>
            <div className="setting-item">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={autoUpdate}
                  onChange={(e) => setAutoUpdate(e.target.checked)}
                />
                <span>Auto-update Apps</span>
              </label>
            </div>
          </div>

          <div className="settings-section">
            <h3>About</h3>
            <p className="about-text">
              OSApps v1.0.0<br/>
              The Open Source No Garbage App Store<br/>
              <a href="https://github.com/mpets1/OSApps" target="_blank" rel="noopener noreferrer">
                Visit GitHub
              </a>
            </p>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-primary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
