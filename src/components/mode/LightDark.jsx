import React, { useState } from 'react'
import '../mode/LightDark.css'
import { FaSun, FaMoon } from 'react-icons/fa';
import '../note/Note'
const LightDark = () => {

    const [darkMode, setDarkMode] = useState(false);

    const toggleTheme = () => {
        setDarkMode(!darkMode);
        document.body.className = darkMode ? '' : 'dark-mode'; // Update body class for global styling
    };

    return (
        <div className={`navbar_div ${darkMode ? 'dark' : 'light'}` }>
            <button onClick={toggleTheme} className="toggle-button">
            {darkMode ? <FaSun /> : <FaMoon />}
            </button>
        </div>
    )
}

export default LightDark
