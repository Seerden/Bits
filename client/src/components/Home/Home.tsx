import styles from "./Home.module.scss";

/* 
    Include a few reusable HTML tag wrappers with classNames attached, so that
    the main component (Home) reads a bit smoother
*/
function Section({ children }) {
    return <section className={styles.Section}>{children}</section>;
}

function SectionHeader({ children }) {
    return (
        <header>
            <h3 className={styles.Header}>{children}</h3>
        </header>
    );
}

const Home = () => {
    return (
        <div className={styles.Home}>
            <h2>Welcome to Bits: a habit tracker!</h2>

            <Section>
                <SectionHeader>About</SectionHeader>
                Bits is a habit tracking application. You can create various types of
                habits, and track however often you want to complete a given task. If you
                like to get visual feedback on how well you're sticking to a habit, you've
                come to the right place. We'll let you know all about how well you're
                sticking to each habit you choose to track.
            </Section>
            <Section>
                <SectionHeader>Why?</SectionHeader>
                Why does Bits exist?
                <ul>
                    <li>
                        It's yet another project to add to my full-stack web development
                        portfolio.
                    </li>
                    <li>
                        I felt the need for a streamlined habit tracking application that
                        does more than just allow me to track whether or not I did
                        something on a given day.
                    </li>
                </ul>
            </Section>
            <Section>
                <SectionHeader>Getting started</SectionHeader>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores sit est,
                in odit saepe libero atque eveniet eligendi vero esse a adipisci
                voluptates ipsa blanditiis? Nobis libero officia impedit. Accusamus
                perspiciatis architecto esse consectetur itaque, impedit nobis, eligendi
                tenetur sed ut, excepturi pariatur quisquam nesciunt veniam dolores!
                Provident, atque quod. rerum? Officia, aliquid dolore. Ullam magnam
                incidunt ipsam?
            </Section>
        </div>
    );
};

export default Home;
