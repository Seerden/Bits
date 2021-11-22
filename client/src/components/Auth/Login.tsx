import { useLoginForm } from "./useLoginForm";
import PasswordField from "./PasswordField";
import cs from "./Login.module.scss";

type LoginProps = {
	message?: string;
};

const Login = ({ message }: LoginProps) => {
	const { handleSubmit, handleInputChangeOrBlur, message: loginMessage } = useLoginForm();

	return (
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
						onChange={(e) => handleInputChangeOrBlur(e, "username")}
					/>
				</p>
				<p className={cs.Field}>
					<PasswordField
						htmlFor="password"
						text="Password"
						handleChange={(e) => handleInputChangeOrBlur(e, "password")}
					/>
				</p>
				<input className={cs.Button} type="submit" value="Log me in!" />
			</fieldset>
		</form>
	);
};

export default Login;
