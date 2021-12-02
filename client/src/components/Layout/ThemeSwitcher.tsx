import { useCallback, useState } from "react";
import { BsSunFill, BsMoonFill } from "react-icons/bs";
import { IconBaseProps } from "react-icons/lib";
import cs from "./ThemeSwitcher.module.scss";

enum Themes {
    DARK = "dark",
    LIGHT = "light",
}

type ThemesUnion = `${Themes}`;

const ThemeSwitcher = () => {
    const [theme, setTheme] = useState<ThemesUnion>(Themes.DARK);

    const toggleDataTheme = useCallback(() => {
        const newTheme = theme === Themes.DARK ? Themes.LIGHT : Themes.DARK;
        setTheme(newTheme);
        document.body.setAttribute("data-theme", newTheme);
    }, [theme]);

    const iconProps: Partial<IconBaseProps> = {
        fill: theme === "dark" ? "var(--light-subdued)" : "yellow",
        size: "50%",
    };

    return (
        <button
            className={cs.ThemeButton}
            title="toggle theme"
            onClick={() => toggleDataTheme()}
        >
            {theme === "dark" ? (
                <BsMoonFill {...iconProps} className={cs.Dark} />
            ) : (
                <BsSunFill {...iconProps} className={cs.Light} />
            )}
        </button>
    );
};

export default ThemeSwitcher;
