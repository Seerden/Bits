import { useFetchUsers } from "helpers/api/fetchUsers";
import { useAuth } from "hooks/useAuth";
import { useToggle } from "hooks/useToggle";
import { useCallback, useEffect, useState } from "react";
import { useLoginMutation } from "./loginMutation";

type Credentials = {
    username: string,
    password: string,
}

const defaultCredentials = {
    username: '',
    password: ''
}

const Login = (props) => {
    const base = "Login";    
    const [showPassword, toggleShowPassword] = useToggle({ initial: false });
    const [credentials, setCredentials] = useState<Credentials>(defaultCredentials);

    function handleInputBlur(e: React.ChangeEvent<HTMLInputElement>, field: keyof Credentials) {
        const { value } = e.target;
        setCredentials(cur => ({ ...cur, [field]: value}))
    }

    const { data, mutate } = useLoginMutation();
    const { data: users } = useFetchUsers();

    const handleSubmit = useCallback(() => {
        mutate(credentials);
    }, [mutate, credentials])

    // @todo: handle successful/failed login requests
    // @todo: move mutation and effects to useAuth

    return (
        <form 
            className={`${base}`}
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}
        >
            <input 
                type="text" 
                name="username"
                onChange={e => handleInputBlur(e, 'username')}
            />
            <input 
                type={showPassword ? 'text' : 'password'} 
                name="password" 
                onChange={e => handleInputBlur(e, 'password')}
            />
            <input 
                type="button" 
                value={`${showPassword ? 'Hide' : 'Show'} password`} 
                onClick={toggleShowPassword}
            />
            <input 
                type="submit" 
                value="Login"
            />
        </form>
    )
}

export default Login