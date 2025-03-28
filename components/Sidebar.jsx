import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown, FaChevronRight, FaBars, FaHome, FaBook, FaCog } from 'react-icons/fa';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [dropdowns, setDropdowns] = useState({});
  const [subDropdowns, setSubDropdowns] = useState({});
  const [hoveredItem, setHoveredItem] = useState(null);

  // Separate arrays for each section
  const dashboardItems = [
    {
      title: 'Dashboard',
      path: '/',
      icon: <FaHome />
    }
  ];

  const CreateNote = [
    {
      title: 'New Note',
      icon: <FaBook />,
      submenu: [
        { title: 'New Category', path: '/settings/profile' },
        { title: 'Create Note', path: '/new-note' }
      ]
    }
  ];

  const topicItems = [
    {
      title: 'Topics',
      icon: <FaBook />,
      submenu: [
        {
          title: 'Mathematics',
          path: '/topics/math',
          subcategories: [
            { title: 'Algebra', path: '/topics/math/algebra' },
            { title: 'Geometry', path: '/topics/math/geometry' },
            { title: 'Calculus', path: '/topics/math/calculus' }
          ]
        },
        {
          title: 'Science',
          path: '/topics/science',
          subcategories: [
            { title: 'Physics', path: '/topics/science/physics' },
            { title: 'Chemistry', path: '/topics/science/chemistry' },
            { title: 'Biology', path: '/topics/science/biology' }
          ]
        },
        {
          title: 'History',
          path: '/topics/history',
          subcategories: [
            { title: 'World History', path: '/topics/history/world' },
            { title: 'Ancient History', path: '/topics/history/ancient' },
            { title: 'Modern History', path: '/topics/history/modern' }
          ]
        }
      ]
    }
  ];

  const settingsItems = [
    {
      title: 'Settings',
      icon: <FaCog />,
      submenu: [
        { title: 'Profile', path: '/settings/profile' },
        { title: 'Preferences', path: '/settings/preferences' }
      ]
    }
  ];

  const toggleDropdown = (title) => {
    setDropdowns(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const toggleSubDropdown = (title) => {
    setSubDropdowns(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const renderMenuItems = (items) => {
    return items.map((item, index) => (
      <div
        key={index}
        className="menu-item"
        onMouseEnter={() => setHoveredItem(item.title)}
        onMouseLeave={() => setHoveredItem(null)}
      >
        {item.submenu ? (
          <div className="menu-item-wrapper">
            <div
              className="menu-title"
              onClick={() => toggleDropdown(item.title)}
            >
              <span className="icon-wrapper">{item.icon}</span>
              <span className="title-text">{item.title}</span>
              <span className="dropdown-icon">
                {dropdowns[item.title] ? <FaChevronDown /> : <FaChevronRight />}
              </span>
            </div>
            <div className={`submenu ${dropdowns[item.title] ? 'open' : ''}`}>
              {item.submenu.map((subItem, subIndex) => (
                <div key={subIndex} className="submenu-group">
                  <div
                    className="submenu-header"
                    onClick={() => toggleSubDropdown(subItem.title)}
                  >
                    <Link to={subItem.path} className="submenu-title">
                      {subItem.title}
                    </Link>
                    {subItem.subcategories && (
                      <span className="dropdown-icon">
                        {subDropdowns[subItem.title] ? <FaChevronDown /> : <FaChevronRight />}
                      </span>
                    )}
                  </div>
                  {subItem.subcategories && subDropdowns[subItem.title] && (
                    <div className="subcategories">
                      {subItem.subcategories.map((subCat, subCatIndex) => (
                        <Link
                          key={subCatIndex}
                          to={subCat.path}
                          className="subcategory-item"
                        >
                          {subCat.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="menu-item-wrapper">
            <Link to={item.path} className="menu-link">
              <span className="icon-wrapper">{item.icon}</span>
              <span className="title-text">{item.title}</span>
            </Link>
            {!isOpen && hoveredItem === item.title && (
              <div className="floating-menu">
                <div className="floating-title">{item.title}</div>
              </div>
            )}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <button className="toggle-btn" onClick={toggleSidebar}>
          <FaBars />
        </button>
      </div>
      <nav className="sidebar-nav">
        <div className="sidebar-section">
          {renderMenuItems(dashboardItems)}
        </div>
        <div className="sidebar-section">
          {renderMenuItems(CreateNote)}
        </div>
        <div className="sidebar-section">
          {renderMenuItems(topicItems)}
        </div>
        <div className="sidebar-section">
          {renderMenuItems(settingsItems)}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
