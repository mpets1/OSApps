import React from 'react';

function Sidebar({ category, onCategoryChange }) {
  const categories = [
    { id: 'all', label: 'All Apps' },
    { id: 'development', label: 'Development' },
    { id: 'productivity', label: 'Productivity' },
    { id: 'graphics', label: 'Graphics & Design' },
    { id: 'media', label: 'Media & Audio' },
    { id: 'utilities', label: 'Utilities' },
    { id: 'games', label: 'Games' },
    { id: 'education', label: 'Education' },
    { id: 'system', label: 'System Tools' },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-section">
        <div className="sidebar-title">Categories</div>
        <ul className="category-list">
          {categories.map((cat) => (
            <li
              key={cat.id}
              className={`category-item ${category === cat.id ? 'active' : ''}`}
              onClick={() => onCategoryChange(cat.id)}
            >
              {cat.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
