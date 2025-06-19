import { createContext, useContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const themes = {
  light: {
    name: "Green-gold",
    lines1: "#c9ab81",// Gold
    lines: "#C9A54E",// Gold1
    background: "#0B1315",// Ziti
    background1: "#1A2C31",// Green-Khzy
    text: "#c9ab81",
    text1: "#cfccc8",
  },
  dark: {
    name: "Dark-gold",
    lines1: "#D4AF37",// Royal Gold
    lines: "#B8860B",// Dark Goldenrod
    background: "#0A0A0A",// Rich Black
    background1: "#1A1A1A",// Dark Gray
    text: "#D4AF37",// Royal Gold
    text1: "#E5E4E2",// Platinum
  },
  nature: {
    name: "elegant",
    lines1: "#000000", // Pure Black
    lines: "#1A1A1A", // Near Black
    background: "#ECECEC", // gray White
    background1: "#F5F5F5", // Light Gray
    text: "#000000", // Pure Black
    text1: "#1A1A1A", // Near Black
  },
  renova: {
    name: "renova",
    lines1: "#c69c6d", // Gold/Tan
    lines: "#c69c6d", // Gold/Tan
    background: "#153057", // Dark Blue
    background1: "#153057", // Dark Blue
    text: "#c69c6d", // Gold/Tan
    text1: "#bec1c4", // Light Gray
  },
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme && themes[savedTheme] ? savedTheme : "light";
  });

  useEffect(() => {
    const theme = themes[currentTheme];
    if (!theme) return;

    localStorage.setItem("theme", currentTheme);
    
    // Set CSS variables
    const cssVariables = {
      "--bg-theme": theme.background,
      "--bg1-theme": theme.background1,
      "--line1-theme": theme.lines1,
      "--line-theme": theme.lines,
      "--text-theme": theme.text,
      "--text1-theme": theme.text1,
    };

    Object.entries(cssVariables).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }, [currentTheme]);

  const changeTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, changeTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}; 