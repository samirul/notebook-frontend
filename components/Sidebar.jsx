import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown, FaChevronRight, FaBars, FaHome, FaBook, FaCog } from 'react-icons/fa';
import axios from 'axios';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [dropdowns, setDropdowns] = useState({});
  const [subDropdowns, setSubDropdowns] = useState({});
  const [hoveredItem, setHoveredItem] = useState(null);
  const [menuNoteItem, setMenuNoteItem] = useState([]);

  const fetchMenuNoteItem = async () => {
    const response = await axios.get("http://localhost:8000/api/notes/notes/",
      { withCredentials: true }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
    setMenuNoteItem([response.data]);
  }

  useEffect(()=>{
    fetchMenuNoteItem();
  },[])

  // Separate arrays for each section
  const dashboardItems = [
    {
      title: 'Dashboard',
      path: '/',
      icon: <FaHome />
    }
  ];

  const AllNotes = [
    {
      title: 'All',
      path: '/notes',
      icon: <FaHome />
    }
  ];

  const CreateNote = [
    {
      title: 'New',
      icon: 'FaBook',
      submenu: [
        { title: 'New Category', path: '/new-category' },
        { title: 'Create Note', path: '/new-note' }
      ]
    }
  ];

  // const settingsItems = [
  //   {
  //     title: 'Settings',
  //     icon: 'FaCog',
  //     submenu: [
  //       { title: 'Profile', path: '/settings/profile' },
  //       { title: 'Preferences', path: '/settings/preferences' }
  //     ]
  //   }
  // ];

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
              <span className="icon-wrapper">{item.icon == 'FaBook' ? <FaBook/> : "" ||
               item.icon == 'FaChevronDown' ? <FaChevronDown/> : "" ||
               item.icon == 'FaBars' ? <FaBars/> : "" ||
               item.icon == 'FaHome' ? <FaHome/> : "" ||
               item.icon == 'FaCog' ? <FaCog/> : ""}</span>
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
          {renderMenuItems(AllNotes)}
        </div>
        <div className="sidebar-section">
          {renderMenuItems(CreateNote)}
        </div>
        <div className="sidebar-section">
          {renderMenuItems(menuNoteItem)}
        </div>
        {/* <div className="sidebar-section">
          {renderMenuItems(settingsItems)}
        </div> */}
      </nav>
    </div>
  );
};

export default Sidebar;
