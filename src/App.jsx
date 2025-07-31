import { useState, useEffect } from 'react'
import useLocalStorage from "use-local-storage";
import Navbars from '../components/Navbars';
import {
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom";
import HomePage from '../pages/HomePage';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import Notfoundpage from '../pages/Notfoundpage';
import Notes from '../pages/Notes';
import NewNotes from '../pages/NewNotes';
import NewCategory from '../pages/NewCategory';
import SinglePage from '../pages/SinglePage';
import TextUpdatePage from '../pages/TextUpdatePage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import { SocketConnection } from '../components/SocketConnection';
import { ToastContainer } from 'react-toastify';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    SocketConnection();
  }, [])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const location = useLocation();
  const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDark, setIsDark] = useLocalStorage("isDark", preference);
  const hideMain = location.pathname === "/" || location.pathname === "/404" ||
    location.pathname === "/login" || location.pathname === "/register";
  return (
    <>
      <div className="App" data-theme={isDark ? "dark" : "light"}>
        {hideMain ?
          <main>
            <Navbars value={isDark} handleChange={() => setIsDark(!isDark)} />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<Navigate to="/404" />} />
              <Route path="/404" element={<Notfoundpage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
            <Footer />
          </main>
          : <main className={`main-content ${isSidebarOpen ? '' : 'sidebar-closed'}`}>
            <Navbars value={isDark} handleChange={() => setIsDark(!isDark)} />
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <Routes>
              <Route path="*" element={<Navigate to="/404" />} />
              <Route path="/notes" element={<Notes value={isDark} />} />
              <Route path="/new-note" element={<NewNotes />} />
              <Route path="/new-category" element={<NewCategory value={isDark} />} />
              <Route path="/note/:note_id" element={<SinglePage value={isDark} />} />
              <Route path="/note/update/:note_id" element={<TextUpdatePage />} />
            </Routes>
          <ToastContainer/>
          </main>
        }
      </div>
    </>
  )
}

export default App
