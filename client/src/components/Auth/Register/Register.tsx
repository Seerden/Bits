import { Link } from "react-router-dom";
import cs from "../Auth.module.scss";
import PasswordField from "../PasswordField";
import { useRegister } from "./useRegister";

const Register = () => {
    const { handleChange, handleSubmit, borderColor, message } = useRegister();

    return (
        <form className={cs.Form} onSubmit={handleSubmit}>
            {message && <div className={cs.Message}>{message}</div>}
            <header>
                <h2 className={cs.Header}>Create a new account</h2>
            </header>
            <fieldset>
                <p className={cs.Field}>
                    <label htmlFor="username">Username</label>

                    <input type="text" name="username" onChange={handleChange} />
                </p>

                <p>
                    <PasswordField
                        htmlFor="password"
                        text="Password"
                        onChange={handleChange}
                        style={{ borderColor }}
                    />
                    <PasswordField
                        htmlFor="repeatPassword"
                        text="Repeat password"
                        onChange={handleChange}
                        style={{ borderColor }}
                    />
                </p>
                <p>
                    <input type="submit" value="Register" className={cs.Button} />
                </p>
            </fieldset>
            <p className={cs.Paragraph}>
                Already have an account?{" "}
                <Link className={cs.Link} to="/login">
                    Sign in
                </Link>
            </p>
        </form>
    );
};

export default Register;
