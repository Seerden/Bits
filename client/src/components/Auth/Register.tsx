import { useCallback, useMemo } from "react";
import cs from "./register.module.scss";
import PasswordField from "./PasswordField";
import { useRegister } from "./useRegister";

const Register = (props) => {
	const { match, handleChange, handleSubmit } = useRegister();

	const borderColor = useMemo(() => {
		return match ? "forestgreen" : "";
	}, [match]);

	
	return (
		<form className={cs.Register} onSubmit={handleSubmit}>
			<section className={cs.Register__field}>
				<label htmlFor="username">Username</label>
				<input type="text" name="username" onChange={handleChange} />
			</section>

			<section className={cs.Register__field}>
				<PasswordField
					htmlFor="password"
					text="Password"
					handleChange={handleChange}
					style={{ borderColor }}
				/>
				<PasswordField
					htmlFor="repeatPassword"
					text="Repeat password"
					handleChange={handleChange}
					style={{ borderColor }}
				/>
			</section>
			<input
				type="submit"
				value="Register"
				className={cs.Register__submit}
			/>
		</form>
	);
};

export default Register;
