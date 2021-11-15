import { useLoginForm } from "./useLoginForm";
import cs from "./register.module.scss";
import PasswordField from "./PasswordField";

type LoginProps = {
	message?: string;
};

const Login = ({ message }: LoginProps) => {
	const { handleSubmit, handleInputChangeOrBlur } = useLoginForm();

	return (
		<>
			{message && <div className={cs.Register__message}>{message}</div>}

			<form
				className={`${cs.Register} ${cs.Form}`}
				onSubmit={(e) => {
					e.preventDefault();
					handleSubmit();
				}}
			>
				<header>
					<h2>Log in</h2>
				</header>
				<section className={cs.Register__field}>
					<p style={{ marginBottom: "1rem" }}>
						<label htmlFor="username">Username</label>
						<input
							type="text"
							name="username"
							onChange={(e) => handleInputChangeOrBlur(e, "username")}
						/>
					</p>
					<PasswordField
						htmlFor="password"
						text="Password"
						handleChange={(e) => handleInputChangeOrBlur(e, "password")}
					/>
				</section>
				<input className={cs.Register__submit} type="submit" value="Log me in!" />
			</form>
		</>
	);
};

export default Login;
