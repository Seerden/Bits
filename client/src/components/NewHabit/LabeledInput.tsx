const LabeledInput = ({ label, type, htmlFor, ...inputProps }) => {
	return (
		<p>
			<label htmlFor={htmlFor}>{label}</label>
			<input type={type} name={htmlFor} {...inputProps} />
		</p>
	);
};

export default LabeledInput;
