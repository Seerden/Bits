import { useCallback, useEffect, useState } from "react";
import type { Credentials } from "types/credentials";
import { useAuth } from "hooks/useAuth";
import { Maybe } from "../../../../../shared/types/Maybe";

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
    }, [error]);

    const handleSubmit = useCallback(() => {
        const { username, password } = credentials;
        if (username.length > 0 && password.length > 0) {
            login(credentials);
        } else {
            setMessage("You need to specify your username and password");
        }
    }, [credentials]);

    /**
     * onChange/onBlur event handler that sets credentials[name] to `value`,
     * where { name, value } = e.target.
     *
     * @note For this function to work properly, make sure that the input
     * that this handler controls is controlled, and that its `name`  matches
     * the `credentials` property we want it to control.
     */
    function handleInputChangeOrBlur(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setCredentials((cur) => ({ ...cur, [name]: value }));
    }

    return { handleSubmit, handleInputChangeOrBlur, message };
}
