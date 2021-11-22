import { useCallback, useEffect, useState } from "react";
import type { Credentials } from "types/credentials";
import { useAuth } from "hooks/useAuth";
import { Maybe } from "../../../../shared/types/Maybe";

const defaultCredentials = {
	username: "",
	password: "",
};

export function useLoginForm() {
	const [credentials, setCredentials] = useState<Credentials>(defaultCredentials);
    const [message, setMessage] = useState<Maybe<string>>(null);
	const { login, error } = useAuth();

    useEffect(() => {
        error && setMessage(error.response.data);
    }, [error])

	const handleSubmit = useCallback(() => {
        const { username, password } = credentials;
        if (username.length > 0 && password.length > 0) {
            login(credentials);
        } else {
            setMessage("You need to specify your username and password");
        }
	}, [credentials]);

	function handleInputChangeOrBlur(e: React.ChangeEvent<HTMLInputElement>, field: keyof Credentials) {
		const { value } = e.target;
		setCredentials((cur) => ({ ...cur, [field]: value }));
	}

	return { handleSubmit, handleInputChangeOrBlur, message };
}
