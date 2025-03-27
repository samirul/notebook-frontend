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
import Topics from '../pages/Topics';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
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
              <Route path="/topics" exact element={<Topics />} />
            </Routes>
            {/* <Footer/> */}
          </main>
        }
      </div>
    </>
  )
}

export default App
