import { useState } from 'react'
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

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const location = useLocation();
  const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDark, setIsDark] = useLocalStorage("isDark", preference);
  const hideMain = location.pathname === "/" || location.pathname === "/404";
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
            </Routes>
            <Footer />
          </main>
          : <main className={`main-content ${isSidebarOpen ? '' : 'sidebar-closed'}`}>
            <Navbars value={isDark} handleChange={() => setIsDark(!isDark)} />
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <Routes>
              <Route path="*" element={<Navigate to="/404" />} />
              <Route path="/notes" exact element={<Notes value={isDark}/>} />
              <Route path="/new-note" exact element={<NewNotes />} />
              <Route path="/new-category" exact element={<NewCategory value={isDark} />} />
              <Route path="/note/:note_id/" exact element={<SinglePage value={isDark}/>} />
              <Route path="/note/update/:note_id/" exact element={<TextUpdatePage/>} />
              <Route path="/login" exact element={<Login/>} />
            </Routes>
          </main>
        }
      </div>
    </>
  )
}

export default App
