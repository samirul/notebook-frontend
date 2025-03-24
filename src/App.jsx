import { useState } from 'react'
import useLocalStorage from "use-local-storage";
import Navbars from '../components/Navbars';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import HomePage from '../pages/HomePage';
import Footer from '../components/Footer';


function App() {
  const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDark, setIsDark] = useLocalStorage("isDark", preference);
  return (
    <>
      <Navbars value={isDark} handleChange={() => setIsDark(!isDark)}/>
      <div className="App" data-theme={isDark ? "dark" : "light"}>
      <Router>
         <Routes>
            <Route path="/" exact element={<HomePage />} />
         </Routes>
      </Router>
      <Footer/>
      </div>
    </>
  )
}

export default App
