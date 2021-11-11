import CompactHabit from "components/CompactHabit/CompactHabit";
import NewHabit from "components/NewHabit/NewHabit";
import Timescale from "components/Timescale/Timescale";
import { useEffect, useState } from "react";
import NewHabitButton from "./NewHabitButton/NewHabitButton";
import { useHabits } from "./useHabits";
import "./Habits.scss";

const Habits = () => {
	const base = "Habits";
	const {
		data: habits,
		timestep,
		setTimestep,
		cycleTimestep,
		labels,
		labelDates,
		partitionsAsTimes,
	} = useHabits();

    useEffect(() => {
        habits && console.log(habits)
    }, [habits])

	const [showNewHabit, setShowNewHabit] = useState<boolean>(false);

	const timescaleProps = { labels, cycleTimestep, timestep, setTimestep };

	return (
		<div className={`${base}`}>
			<Timescale {...timescaleProps} />
			{habits?.length > 0 && (
				<ul className={`${base}__list`}>
					{habits.map(({ habitData, completionData }, index) => {
						const compactHabitProps = {
							completionData,
							habitData,
							partitionsAsTimes,
							labelDates,
						};
						return <CompactHabit key={index} {...compactHabitProps} />;
					})}
				</ul>
			)}

			{showNewHabit ? (
				<>
					<button style={{ width: "10rem" }} onClick={() => setShowNewHabit(false)}>
						Stop creating new habit
					</button>
					<NewHabit />
				</>
			) : (
				<NewHabitButton onClick={() => setShowNewHabit(true)} />
			)}
		</div>
	);
};

export default Habits;
