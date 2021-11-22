import { useToggle } from "hooks/useToggle";
import { useMemo } from "react";
import { FiEyeOff, FiEye } from "react-icons/fi";
import cs from "./Register/register.module.scss";

type PasswordFieldProps = {
	text: string;
	htmlFor: string;
	handleChange: (e: any) => void; // @todo: use react setter type
	style?: React.CSSProperties;
};

function PasswordField({
	text,
	htmlFor,
	handleChange,
	style,
}: PasswordFieldProps) {
	const [hidden, toggleHidden] = useToggle({ initial: true });

	const type = useMemo(() => {
		return hidden ? "password" : "text";
	}, [hidden]);

	return (
		<div>
			<label htmlFor={htmlFor}>{text}</label>
			<p
				style={{
					display: "flex",
					alignItems: "center",
					gap: "0.5rem",
				}}
			>
				<input
					type={type}
					name={htmlFor}
					onChange={handleChange}
					style={style}
				/>
				<span className={cs.Register__eye} onClick={toggleHidden}>
					{hidden ? <FiEyeOff fill="#111" /> : <FiEye fill="#333" />}
				</span>
			</p>
		</div>
	);
}

export default PasswordField;
