import React from "react";
import { useTheme } from "next-themes";
import { IconDark, IconLight } from "../../../public/static/icons/IconSvg";

const ButtonDarkMode = () => {
    const { systemTheme, theme, setTheme } = useTheme();
    const currentTheme = theme === "system" ? systemTheme : theme;

    return (
        <button
            onClick={() =>
                theme == "dark" ? setTheme("light") : setTheme("dark")
            }
            className="transition-all duration-100 w-6 h-6 px-1"
        >
            {currentTheme == "light" ? (
                <IconLight
                    className="w-4 h-4 fill-white"
                />
            ) : (
                <IconDark
                    className="w-6 h-6 block"
                />
            )}
        </button>
    );
};

export default ButtonDarkMode;
