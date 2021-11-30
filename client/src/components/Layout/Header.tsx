import sc from "./Header.module.scss";
import { useHeaderLinks } from "./useHeader";

const Header = () => {
    const links = useHeaderLinks();

    return (
        <nav className={sc.Header}>
            <span className={sc.Header__logo}>Bits</span>

            <div className={sc.Buttons}>{links}</div>
        </nav>
    );
};

export default Header;
