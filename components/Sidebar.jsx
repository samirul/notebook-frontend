import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown, FaChevronRight, FaBars, FaHome, FaBook, FaCog } from 'react-icons/fa';
import axios from 'axios';

const Sidebar = ({ isOpen, toggleSidebar, showHeader }) => {
  const [dropdowns, setDropdowns] = useState({});
  const [subDropdowns, setSubDropdowns] = useState({});
  const [hoveredItem, setHoveredItem] = useState(null);
  const [menuNoteItem, setMenuNoteItem] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [resultBackend, setResultBackend] = useState(false);

  const checkLoggedIn = async () => {
    try {
      const response = await axios.get('http://localhost:8000/accounts/api/logged/status/', { withCredentials: true })
      if (response.data.item.logged_in === 'yes') {
        setResultBackend(true)
      } else if (response.data.item.logged_in === 'no') {
        setResultBackend(false)
      }

    } catch (error) {
      if (error.status === 400) {
        setResultBackend(false)
      }
    }
  }

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

  useEffect(() => {
    checkLoggedIn();
    if(resultBackend){
      fetchMenuNoteItem();
    }
  },[updated, resultBackend])

  // Separate arrays for each section
  const Home = [
    {
      id: 1,
      title: 'Home',
      path: '/',
      icon: <FaHome />
    }
  ];

  const AllNotes = [
    {
      id: 2,
      title: 'All',
      path: '/notes',
      icon: <FaHome />
    }
  ];

  const CreateNote = [
    {
      id: 3,
      title: 'New',
      icon: 'FaBook',
      submenu: [
        { title: 'New Category', path: '/new-category' },
        { title: 'Create Note', path: '/new-note' }
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

  const handleUpdate =() =>{
    setUpdated(prev => !prev)
  }

  const renderMenuItems = (items) => {
    return items && items.map((item) => (
      <div
        key={item.id || item.title}
        className="menu-item"
        onMouseEnter={() => setHoveredItem(item.title)}
        onMouseLeave={() => setHoveredItem(null)}
      >
        {item.submenu ? (
          <div className="menu-item-wrapper">
            <div
              className="menu-title"
              onClick={() => {toggleDropdown(item.title), handleUpdate()}}
            >
              <span className="icon-wrapper">
                {{
                  FaBook: <FaBook />,
                  FaChevronDown: <FaChevronDown />,
                  FaBars: <FaBars />,
                  FaHome: <FaHome />,
                  FaCog: <FaCog />
                }[item.icon] || null}
              </span>
              <span className="title-text">{item.title}</span>
              <span className="dropdown-icon">
                {dropdowns[item.title] ? <FaChevronDown /> : <FaChevronRight />}
              </span>
            </div>
            <div className={`submenu ${dropdowns[item.title] ? 'open' : ''}`}>
              {item.submenu && item.submenu.map((subItem, subIndex) => (
                <div key={subItem.id || subItem.title || `sub-${subIndex}`} className="submenu-group">
                  <div
                    className="submenu-header"
                    onClick={() => toggleSubDropdown(subItem.title)}
                  >
                    <Link to={subItem.path} className="submenu-title" onClick={handleUpdate}>
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
                      {subItem && subItem.subcategories.map((subCat, catIndex) => (
                        <Link
                          key={subCat.id || subCat.title || `cat-${catIndex}`}
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
        <p className={showHeader? "sidebar-open-header": "sidebar-closed-header"}>MyNotebook</p>
        <button className="toggle-btn" onClick={toggleSidebar}>
          <FaBars />
        </button>
      </div>
      <nav className="sidebar-nav">
        <div className="sidebar-section">
          {renderMenuItems(Home)}
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
      </nav>
    </div>
  );
};

export default Sidebar;