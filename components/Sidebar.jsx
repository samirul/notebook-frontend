import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown, FaChevronRight, FaBars, FaHome, FaBook, FaCog } from 'react-icons/fa';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [dropdowns, setDropdowns] = useState({});
  const [hoveredItem, setHoveredItem] = useState(null);

  const menuItems = [
    {
      title: 'Dashboard',
      path: '/',
      icon: <FaHome />
    },
    {
      title: 'Topics',
      icon: <FaBook />,
      submenu: [
        { title: 'Mathematics', path: '/topics/math' },
        { title: 'Science', path: '/topics/science' },
        { title: 'History', path: '/topics/history' }
      ]
    },
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

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <button className="toggle-btn" onClick={toggleSidebar}>
          <FaBars />
        </button>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item, index) => (
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
                {!isOpen && hoveredItem === item.title && (
                  <div className="floating-menu">
                    <div className="floating-title">{item.title}</div>
                    {item.submenu.map((subItem, subIndex) => (
                      <Link 
                        key={subIndex} 
                        to={subItem.path}
                        className="floating-menu-item"
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                )}
                <div className={`submenu ${dropdowns[item.title] ? 'open' : ''}`}>
                  {item.submenu.map((subItem, subIndex) => (
                    <Link 
                      key={subIndex} 
                      to={subItem.path}
                      className="submenu-item"
                    >
                      {subItem.title}
                    </Link>
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
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
