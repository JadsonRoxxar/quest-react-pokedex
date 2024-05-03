import { createContext, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";




export const themes = {
    light: {
        color: "#000000",
        background: "#f5f5f5",
        cardBackground: "#ffcb05",
        cardColor: "#316cb3",
        headerColorDetails: "#940cce",
        iconTheme: <FiSun size={36} color="orange" />
    },

    dark: {
        color: "#ffffff",
        background: "#808080",
        cardBackground: "#696969",
        cardColor: "#ffcb05",
        headerColorDetails: "#4b0966",
        iconTheme: <FiMoon size={36} color="black" />
    }
}

export const ThemeContext = createContext({});

export const ThemeProvider = (props) => {
    const [theme, setTheme] = useState(themes.light)

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {props.children}
        </ThemeContext.Provider>
    )
}
