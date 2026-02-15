import React from 'react';
import { FiDownload, FiSearch, FiSettings } from 'react-icons/fi';

function Header({ onSearch, onSettingsClick }) {
  return (
    <div className="header">
      <div className="header-left">
        <FiDownload size={28} />
        <span>OSApps Store</span>
      </div>
      <div className="header-right">
        <input
          type="text"
          className="search-box"
          placeholder="Search open source apps..."
          onChange={(e) => onSearch(e.target.value)}
        />
        <button 
          className="header-settings-btn"
          onClick={onSettingsClick}
          title="Settings"
        >
          <FiSettings size={24} />
        </button>
      </div>
    </div>
  );
}

export default Header;
