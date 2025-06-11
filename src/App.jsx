import { useState, useRef, useEffect } from 'react'
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
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const socketRef = useRef(null);


  const socketConnection = async () => {
    const response = await axios.get('http://localhost:8000/accounts/user/', { withCredentials: true }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      })
    const {id} = response.data.user
    socketRef.current = new WebSocket(`ws://localhost:8000/ws/notifications/${id}/`);
    
    socketRef.current.onopen = () => {
      console.log('websocket connected')
      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.send(JSON.stringify({ 'message': 'Connection established with React notebook-frontend app.' }))
      }
    }

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if(data['type'] != 'undefined' && data['type'] == 'created_category_error'){
        toast.error(data['notification'], {position: 'bottom-left'})
      }else if(data['type'] != 'undefined' && data['type'] == 'notification_created_category'){
        toast.success(data['notification'], {position: 'bottom-left'})
      }else if(data['type'] != 'undefined' && data['type'] == 'notification_created_note'){
        toast.success(data['notification'], {position: 'bottom-left'})
      }else if(data['type'] != 'undefined' && data['type'] == 'created_note_error'){
        toast.error(data['notification'], {position: 'bottom-left'})
      }
    };

    socketRef.current.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => {
      socketRef.current.close();
    };
  }

  useEffect(() => {
    socketConnection();
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
              <Route path="/" exact element={<HomePage />} />
              <Route path="*" element={<Navigate to="/404" />} />
              <Route path="/404" exact element={<Notfoundpage />} />
              <Route path="/login" exact element={<Login />} />
              <Route path="/register" exact element={<Register />} />
            </Routes>
            <Footer />
          </main>
          : <main className={`main-content ${isSidebarOpen ? '' : 'sidebar-closed'}`}>
            <Navbars value={isDark} handleChange={() => setIsDark(!isDark)} />
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <Routes>
              <Route path="*" element={<Navigate to="/404" />} />
              <Route path="/notes" exact element={<Notes value={isDark} />} />
              <Route path="/new-note" exact element={<NewNotes />} />
              <Route path="/new-category" exact element={<NewCategory value={isDark} />} />
              <Route path="/note/:note_id/" exact element={<SinglePage value={isDark} />} />
              <Route path="/note/update/:note_id/" exact element={<TextUpdatePage />} />
            </Routes>
          <ToastContainer/>
          </main>
        }
      </div>
    </>
  )
}

export default App
