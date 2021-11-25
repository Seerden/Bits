import c from "./NewHabit.module.scss";

export function Section({ children }) {
    return <section className={c.Section}>{children}</section>;
}

export function Label(props) {
    return (
        <label htmlFor="" className={c.Label}>
            {props.children}
        </label>
    );
}

export function Form(props) {
    return <form className={c.Form}>{props.children}</form>;
}

export function Row(props) {
    return (
        <>
            <fieldset className={c.Row}>
                <legend className={c.Row__label}>{props.label}</legend>
                <div className={c.Row__fields}>{props.children}</div>
            </fieldset>
        </>
    );
}

export function Description(props) {
    return <span className={c.Description}>{props.children}</span>;
}
