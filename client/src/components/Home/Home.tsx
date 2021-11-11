import styles from "./Home.module.scss";

const Home = (props) => {
	const base = "Home";

	return (
		<div className={styles.Home}>
			<h2>Welcome to Bits: a habit tracker!</h2>

			<p className={styles.Paragraph}>
                <h3 className={styles.Header}>
                    About
                </h3>

				Bits is a habit tracking application. You can create various types of
				habits, and track however often you want to complete a given task. If you
				like to get visual feedback on how well you're sticking to a habit, you've
				come to the right place. We'll let you know all about how well you're
				sticking to each habit you choose to track.
			</p>
		</div>
	);
};

export default Home;
