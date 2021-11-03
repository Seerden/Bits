import { useAuth } from "hooks/useAuth";
import './Header.scss'

const Header = (props) => {
    const base = "Header";
    const { currentUser, login, logout } = useAuth();

    return (
        <div className={`${base}`}>
            <span className={`${base}__logo`}>
                Bits
            </span>
            {currentUser &&
                <div className={`${base}__text`}>
                    <span>Current user: {currentUser && currentUser.username}</span>
                    <input
                        type="button"
                        value="log out"
                        onClick={logout}
                    />
                </div>
            }
        </div>
    )
}

export default Header