import CompactHabit from "components/CompactHabit/CompactHabit";
import NewHabit from "components/NewHabit/NewHabit";
import Timescale from "components/Timescale/Timescale";
import NewHabitButton from "./NewHabitButton/NewHabitButton";
import { useHabits } from "./useHabits";
import "./Habits.scss";
import { useToggle } from "hooks/useToggle";
import { useMemo } from "react";

const Habits = () => {
	const base = "Habits";
	const [showNewHabit, toggleShowNewHabit] = useToggle({ initial: false });
	const {
		data: habits,
		timestep,
		setTimestep,
		cycleTimestep,
		labels,
		labelDates,
		partitionsAsTimes,
	} = useHabits();
	const timescaleProps = { labels, cycleTimestep, timestep, setTimestep };

	const compactHabits = useMemo(
		() =>
			habits?.length > 0 &&
			habits.map(({ habitData, completionData }) => {
				const compactHabitProps = {
					completionData,
					habitData,
					partitionsAsTimes,
					labelDates,
				};
				return <CompactHabit key={new Date().valueOf()} {...compactHabitProps} />;
			}),
		[habits, timestep]
	);

	return (
		<div className={`${base}`}>
			<Timescale {...timescaleProps} />
			{habits?.length > 0 && <ul className={`${base}__list`}>{compactHabits}</ul>}

			{showNewHabit ? (
				<>
					<button style={{ width: "10rem" }} onClick={toggleShowNewHabit}>
						Stop creating new habit
					</button>
					<NewHabit />
				</>
			) : (
				<NewHabitButton onClick={toggleShowNewHabit} />
			)}
		</div>
	);
};

export default Habits;
