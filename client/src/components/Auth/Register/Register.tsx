import cs from "./Register.module.scss";
import PasswordField from "../PasswordField";
import { useRegister } from "./useRegister";

const Register = () => {
	const { match, handleChange, handleSubmit, borderColor } = useRegister();

	return (
		<form className={cs.Register} onSubmit={handleSubmit}>
			<header>
				<h2>Register</h2>
			</header>
			<section className={cs.Register__field}>
				<label htmlFor="username">Username</label>
				<input type="text" name="username" onChange={handleChange} />
			</section>

			<section className={cs.Register__field}>
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
			</section>
			<input type="submit" value="Register" className={cs.Register__submit} />
		</form>
	);
};

export default Register;
