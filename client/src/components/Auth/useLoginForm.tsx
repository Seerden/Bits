import { useCallback, useState } from "react";
import type { Credentials } from "types/credentials";
import { useLoginMutation } from "./loginMutation";

const defaultCredentials = {
    username: '',
    password: ''
}

export function useLoginForm() {
    const [credentials, setCredentials] = useState<Credentials>(defaultCredentials);
    const { data, mutate } = useLoginMutation();
    
    const handleSubmit = useCallback(() => {
    // @todo: handle successful/failed login requests
        mutate(credentials);
    }, [mutate, credentials])

    function handleInputChangeOrBlur(e: React.ChangeEvent<HTMLInputElement>, field: keyof Credentials) {
        const { value } = e.target;
        setCredentials(cur => ({ ...cur, [field]: value}))
    }

    return { handleSubmit, handleInputChangeOrBlur }
}