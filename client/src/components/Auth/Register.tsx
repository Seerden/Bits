import { useCallback, useMemo, useState } from 'react';
import cs from './register.module.scss';
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { useToggle } from 'hooks/useToggle';
import { Maybe } from '../../../../shared/types/Maybe';
import { usePostUser } from 'helpers/api/mutateUser';

type PasswordFieldProps = {
    text: string,
    htmlFor: string,
    handleChange: (e: any) => void;  // @todo: use react setter type
    style?: React.CSSProperties
}

function PasswordField({ text, htmlFor, handleChange, style }: PasswordFieldProps) {
    const [hidden, toggleHidden] = useToggle({ initial: true })

    const type = useMemo(() => {
        return hidden ? 'password' : 'text'
    }, [hidden])

    return (
        <div>
            <label htmlFor={htmlFor}>
                {text}
            </label>
            <p
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}
            >
                <input
                    type={type}
                    name={htmlFor}
                    onChange={handleChange}
                    style={style}
                />
                <span
                    className={cs.Register__eye}
                    onClick={toggleHidden}
                >
                    {
                        hidden
                            ? <FiEyeOff fill="#111" />
                            : <FiEye fill="#333" />
                    }
                </span>
            </p>
        </div>
    )
}

type NewUser = {
    username?: string,
    password?: string,
    repeatPassword?: string
}

const Register = (props) => {
    const [formValue, setFormValue] = useState<NewUser>({});
    const { mutate } = usePostUser();

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();

        const { username, password } = formValue;

        if (username.length > 0 && password.length > 0) {  // @todo: is it worth enforcing stronger passwords?
            mutate({ username, password })
        };
    }, [formValue]);

    const match = useMemo(() => {
        const { password, repeatPassword } = formValue;

        if (password && repeatPassword) {
            return password === repeatPassword;
        };

        return false;

    }, [formValue])

    function handleChange(e) {
        const { value, name } = e.target;

        setFormValue(current => ({
            ...current,
            [name]: value
        }));
    }

    return (
        <form 
            className={cs.Register}
            onSubmit={handleSubmit}
        >
            <section className={cs.Register__field}>
                <label htmlFor="username">
                    Username
                </label>
                <input
                    type="text"
                    name="username"
                    onChange={handleChange}
                />
            </section>

            <section className={cs.Register__field}>
                <PasswordField
                    htmlFor='password'
                    text="Password"
                    handleChange={handleChange}
                    style={{
                        borderColor: match ? 'forestgreen' : ''
                    }}
                />
                <PasswordField
                    htmlFor="repeatPassword"
                    text="Repeat password"
                    handleChange={handleChange}
                    style={{
                        borderColor: match ? 'forestgreen' : ''
                    }}
                />
            </section>
            <input
                type="submit"
                value="Register"
                className={cs.Register__submit}
            />
        </form>
    )
}

export default Register