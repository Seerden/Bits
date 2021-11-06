import { useAuth } from "hooks/useAuth";
import { Link } from "react-router-dom";
import sc from './header.module.scss';

const views = ['register', 'habits']
const headerButtons = views.map((view: string) => 
    <Link 
        to={`/${view}`}
        className={sc.Buttons__button}
    >
        {view[0].toUpperCase()+view.slice(1)}
    </Link>
)

const Header = (props) => {
    const base = "Header";
    const { currentUser, login, logout } = useAuth();

    console.log(sc);

    return (
        <div className={sc.Header}>
            <span className={sc.Header__logo}>
                Bits
            </span>

            <div className={sc.Buttons}>
                {currentUser &&
                    <div className={sc.Header__text}>
                        <span>Current user: {currentUser && currentUser.username}</span>
                        <input
                            type="button"
                            value="log out"
                            onClick={logout}
                        />
                    </div>
                }
                {headerButtons}
            </div>
        </div>
    )
}

export default Header