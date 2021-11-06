import sc from './header.module.scss';
import { useHeaderLinks } from "./useHeader";

const Header = (props) => {
    const links = useHeaderLinks();

    return (
        <div className={sc.Header}>
            <span className={sc.Header__logo}>
                Bits
            </span>

            <div className={sc.Buttons}>
                {links}
            </div>
        </div>
    )
}

export default Header