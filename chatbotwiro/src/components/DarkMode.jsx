import { useState, useEffect } from 'react';

function DarkMode(){
        const [darkMode, setDarkMode] = useState(() => {
          return localStorage.getItem("darkMode") === "true";
        });

        useEffect(() => {
          document.body.classList.toggle("dark", darkMode);
          localStorage.setItem("darkMode", darkMode);
        }, [darkMode]);

        function toggleDarkMode(){
          setDarkMode(!darkMode);
        }
        
        return(
            <button className="darkModeButton" 
              onClick={toggleDarkMode}>
                {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
        );
      }
export default DarkMode;