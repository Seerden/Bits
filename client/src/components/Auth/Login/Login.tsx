import { Link } from "react-router-dom";
import cs from "../Auth.module.scss";
import PasswordField from "../PasswordField";
import { useLoginForm } from "./useLoginForm";

type LoginProps = {
    message?: string;
};

const Login = ({ message }: LoginProps) => {
    const {
        handleSubmit,
        handleInputChangeOrBlur,
        message: loginMessage,
    } = useLoginForm();

    return (
        <>
            <form
                className={cs.Form}
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
            >
                {message && <div className={cs.Message}>{message}</div>}
                {loginMessage && <div className={cs.Message}>{loginMessage}</div>}
                <header>
                    <h2 className={cs.Header}>Log in</h2>
                </header>
                <fieldset>
                    <p className={cs.Field}>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            name="username"
                            onChange={handleInputChangeOrBlur}
                        />
                    </p>
                    <p className={cs.Field}>
                        <PasswordField
                            htmlFor="password"
                            text="Password"
                            onChange={handleInputChangeOrBlur}
                        />
                    </p>
                    <input className={cs.Button} type="submit" value="Log me in!" />
                </fieldset>
                <p className={cs.Paragraph}>
                    Don't have an account?{" "}
                    <Link className={cs.Link} to="/register">
                        Sign up
                    </Link>
                </p>
            </form>
        </>
    );
};

export default Login;
