import cs from "../Auth.module.scss";
import PasswordField from "../PasswordField";
import { useRegister } from "./useRegister";

const Register = () => {
    const { handleChange, handleSubmit, borderColor } = useRegister();

    return (
        <form className={cs.Form} onSubmit={handleSubmit}>
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
        </form>
    );
};

export default Register;
