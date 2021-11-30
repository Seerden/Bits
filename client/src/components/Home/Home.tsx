import cs from "./Home.module.scss";

/* 
    Include a few reusable HTML tag wrappers with classNames attached, so that
    the main component (Home) reads a bit smoother
*/
function Section({ children }) {
    return <section className={cs.Section}>{children}</section>;
}

function SectionHeader({ children }) {
    return (
        <header>
            <h3 className={cs.Header}>{children}</h3>
        </header>
    );
}

const Home = () => {
    return (
        <>
            <h1 className={cs.Title}>Home</h1>
            <div className={cs.Home}>
                <Section>
                    <SectionHeader>About</SectionHeader>
                    Bits is a habit tracking application. You can create various types of
                    habits, and track them like a list of tasks.
                </Section>
                <Section>
                    <SectionHeader>Why does Bits exist?</SectionHeader>
                    <ul>
                        <li>
                            It's yet another project to add to my full-stack web
                            development portfolio.
                        </li>
                        <li>
                            I felt the need for a streamlined habit tracking application
                            that does more than just allow me to track whether or not I
                            did something on a given day.
                        </li>
                    </ul>
                </Section>
            </div>
        </>
    );
};

export default Home;
