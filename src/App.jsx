import { useState } from 'react'
import useLocalStorage from "use-local-storage";
import {Toggle} from '../components/Toggle';
import Navbars from '../components/Navbars';


function App() {
  const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDark, setIsDark] = useLocalStorage("isDark", preference);
  console.log(isDark)
  return (
    <>
    
      <Navbars value={isDark}/>
      <div className="App" data-theme={isDark ? "dark" : "light"}>
      <Toggle isChecked={isDark} handleChange={() => setIsDark(!isDark)} />
    </div>
    </>
  )
}

export default App
