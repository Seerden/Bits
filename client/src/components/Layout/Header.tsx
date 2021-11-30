import sc from "./Header.module.scss";
import { useHeaderLinks } from "./useHeader";
import { BsBookmarkCheck } from "react-icons/bs";

const Header = () => {
    const links = useHeaderLinks();

    return (
        <nav className={sc.Header}>
            <span className={sc.Header__logo}>
                <BsBookmarkCheck size={25} /> <em>Bits</em>
            </span>

            <div className={sc.Buttons}>{links}</div>
        </nav>
    );
};

export default Header;
