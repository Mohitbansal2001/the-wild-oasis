import { createContext, useContext } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, "isDarkMode");
  if(isDarkMode){
    document.documentElement.classList.add("dark-mode")
    document.documentElement.classList.remove("light-mode")
  }else{
    document.documentElement.classList.add("light-mode")
    document.documentElement.classList.remove("dark-mode")

  }

  function toggleDarkMode() {
    setIsDarkMode((prev) => !prev);
  }
  const value = {
    isDarkMode,
    toggleDarkMode,
  };
  return (
    <DarkModeContext.Provider value={value}>
      {children}
    </DarkModeContext.Provider>
  );
}
function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error("Dark Mode was used Outside the  DarkModeProvider");
return context
}
export { DarkModeProvider, useDarkMode };
