import { useToggle } from "hooks/useToggle";
import { useMemo } from "react";
import { FiEyeOff, FiEye } from "react-icons/fi";
import cs from "./Register/Register.module.scss";

type PasswordFieldProps = {
	text: string;
	htmlFor: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // @todo: use react setter type
	style?: React.CSSProperties;
};

function PasswordField({ text, htmlFor, onChange, style }: PasswordFieldProps) {
	const [hidden, toggleHidden] = useToggle({ initial: true });

	const inputType = useMemo(() => {
		return hidden ? "password" : "text";
	}, [hidden]);

	return (
		<span>
			<label htmlFor={htmlFor}>{text}</label>
			<span
				style={{
					display: "flex",
					alignItems: "center",
					gap: "0.5rem",
				}}
			>
				<input type={inputType} name={htmlFor} onChange={onChange} style={style} />
				<span className={cs.Register__eye} onClick={toggleHidden}>
					{hidden ? <FiEyeOff fill="#111" /> : <FiEye fill="#333" />}
				</span>
			</span>
		</span>
	);
}

export default PasswordField;
