import { useCallback, useMemo, useState } from 'react';
import cs from './register.module.scss';
import { usePostUser } from 'helpers/api/mutateUser';
import PasswordField from './PasswordField';

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
        return (password && repeatPassword) && (password === repeatPassword)
    }, [formValue])

    function handleChange(e) {
        const { value, name } = e.target;

        setFormValue(current => ({
            ...current,
            [name]: value
        }));
    };

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