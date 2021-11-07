import { usePostUser } from "helpers/api/mutateUser";
import { useAuth } from "hooks/useAuth";
import { useCallback, useEffect, useMemo, useState } from "react";
import { NewUser } from "types/User";

export function useRegister() {
	const [formValue, setFormValue] = useState<NewUser>({});
	const { mutate, data } = usePostUser();
	const { login } = useAuth();

	// If `data` is populated, that means the user POST was successful
	// in which case we can proceed to login the newly created user for a smooth UI
	useEffect(() => {
		const { username, password } = formValue;
		data?.userId && login({ username, password });
	}, [data, formValue]);

	const match = useMemo(() => {
		const { password, repeatPassword } = formValue;
		return password && repeatPassword && password === repeatPassword;
	}, [formValue]);

	function handleChange(e) {
		const { value, name } = e.target;

		setFormValue((current) => ({
			...current,
			[name]: value,
		}));
	}

	const handleSubmit = useCallback(
		(e) => {
			e.preventDefault();
			e.stopPropagation();

			const { username, password } = formValue;

			if (username.length > 0 && password.length > 0) {
				// @todo: is it worth enforcing stronger passwords?
				mutate({ username, password });
			}
		},
		[formValue]
	);

	return {
		match,
		handleChange,
		handleSubmit,
	} as const;
}
