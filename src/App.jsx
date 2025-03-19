import { useState } from 'react'
import useLocalStorage from "use-local-storage";
import Navbars from '../components/Navbars';


function App() {
  const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDark, setIsDark] = useLocalStorage("isDark", preference);
  return (
    <>
      <Navbars value={isDark} handleChange={() => setIsDark(!isDark)}/>
      <div className="App" data-theme={isDark ? "dark" : "light"}>
    </div>
    </>
  )
}

export default App
