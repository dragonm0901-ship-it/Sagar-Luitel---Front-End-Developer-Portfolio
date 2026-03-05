/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    // Default to the signature lime green
    const [themeColor, setThemeColor] = useState('#ccff00');
    const [isEntered, setIsEntered] = useState(false);

    useEffect(() => {
        // Update the global CSS variable whenever themeColor changes
        document.documentElement.style.setProperty('--lime', themeColor);
    }, [themeColor]);

    const enterSite = () => {
        setIsEntered(true);
    };

    return (
        <ThemeContext.Provider value={{ themeColor, setThemeColor, isEntered, enterSite }}>
            {children}
        </ThemeContext.Provider>
    );
};
