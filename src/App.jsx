import { useState} from 'react'
import useLocalStorage from "use-local-storage";
import Navbars from '../components/Navbars';
import {
  BrowserRouter as Router,
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

const Layout = ({ children }) => {
  const location = useLocation();
  const hideSideMenu = location.pathname === "/404" || location.pathname === "/";

  return (
    <div className="app-container">
      {!hideSideMenu && <Sidebar />}
      <div className="content">{children}</div>
    </div>
  );
};


function App() {
  const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDark, setIsDark] = useLocalStorage("isDark", preference);
  return (
    <>
      <Navbars value={isDark} handleChange={() => setIsDark(!isDark)}/>
      <div className="App" data-theme={isDark ? "dark" : "light"}>
      <Router>
        <Layout>
         <Routes>
            <Route path="/" exact element={<HomePage />} />
            <Route path="*" element={<Navigate to="/404" />} />
            <Route path="/404" exact element={<Notfoundpage />} />
            <Route path="/topics" exact element={<Topics />} />
         </Routes>
         </Layout>
        <Footer/>
      </Router>
      </div>
    </>
  )
}

export default App
