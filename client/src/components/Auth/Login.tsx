import { useToggle } from "hooks/useToggle";
import { useLoginForm } from "./useLoginForm";

const Login = () => {
    const base = "Login";    
    const [showPassword, toggleShowPassword] = useToggle({ initial: false });
    const { handleSubmit, handleInputChangeOrBlur } = useLoginForm();

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
                onChange={e => handleInputChangeOrBlur(e, 'username')}
            />

            <input 
                type={showPassword ? 'text' : 'password'} 
                name="password" 
                onChange={e => handleInputChangeOrBlur(e, 'password')}
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