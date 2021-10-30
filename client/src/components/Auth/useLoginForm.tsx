import { useState } from "react";
import type { Credentials } from "types/credentials";
import { useAuth } from "hooks/useAuth";

const defaultCredentials = {
    username: '',
    password: ''
}

export function useLoginForm() {
    const [credentials, setCredentials] = useState<Credentials>(defaultCredentials);
    const { login } = useAuth();
    
    const handleSubmit = () => {
    // @todo: handle successful/failed login requests
        login(credentials);
    };

    function handleInputChangeOrBlur(e: React.ChangeEvent<HTMLInputElement>, field: keyof Credentials) {
        const { value } = e.target;
        setCredentials(cur => ({ ...cur, [field]: value}))
    }

    return { handleSubmit, handleInputChangeOrBlur }
}