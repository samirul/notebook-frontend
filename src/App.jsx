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
import NotFoundPage from '../pages/NotFoundPage';
import Notes from '../pages/Notes';
import NewNotes from '../pages/NewNotes';
import NewCategory from '../pages/NewCategory';
import SinglePage from '../pages/SinglePage';
import TextUpdatePage from '../pages/TextUpdatePage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import { SocketConnection } from '../components/SocketConnection';
import { ToastContainer } from 'react-toastify';
import { CheckUserRedirect } from '../components/CheckUserRedirect';
import { CheckUser as userCheck } from '../components/CheckUser'
import { Spinner } from 'react-bootstrap';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(false);
  const [resultBackend, setResultBackend] = useState(false)
  const [loading, setLoading] = useState(true);

  const checkAuth = async () =>{
    try{
      const response = await userCheck();
      if(response?.data && response?.data?.user.id && response?.status === 200){
        setResultBackend(true);
      }
    }catch(error){
      if(error.status === 401){
        setResultBackend(false);
      }
    }
  }

  useEffect(() => {
    checkAuth();
    SocketConnection();
    setTimeout(() => {
      setLoading(false);
    }, 1500)
  }, [])
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setShowHeader(prev => !prev)
  };
  const location = useLocation();
  const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDark, setIsDark] = useLocalStorage("isDark", preference);
  const hideMain = location.pathname === "/" || location.pathname === "/404" ||
    location.pathname === "/login" || location.pathname === "/register";

  if (loading) {
    return (
      <div className="loader-overlay" data-theme={isDark ? "dark" : "light"}>
        <Spinner animation="border" role="status" variant={isDark ? "light" : "dark"} size="lg">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <>
      <div className="App" data-theme={isDark ? "dark" : "light"}>
        <CheckUserRedirect/>
        {hideMain ?
          <main>
            <Navbars value={isDark} handleChange={() => setIsDark(!isDark)} />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<Navigate to="/404" />} />
              <Route path="/404" element={<NotFoundPage />} />
              <Route path="/login" element={resultBackend ? <Navigate to="/" replace /> : <Login />} />
              <Route path="/register" element={resultBackend ? <Navigate to="/" replace /> : <Register />} />
            </Routes>
            <Footer />
          </main>
          : <main className={`main-content ${isSidebarOpen ? '' : 'sidebar-closed'}`}>
            <Navbars value={isDark} handleChange={() => setIsDark(!isDark)} />
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} showHeader={showHeader}/>
            <Routes>
              <Route path="*" element={<Navigate to="/404" />} />
              <Route path="/notes" element={resultBackend ? <Notes value={isDark} /> : <Navigate to="/login" replace />} />
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
