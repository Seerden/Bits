import CompactHabit from "components/CompactHabit/CompactHabit";
import Timescale from "components/Timescale/Timescale";
import NewHabitButton from "./NewHabitButton/NewHabitButton";
import { useHabits } from "./useHabits";
import "./Habits.scss";
import { useMemo } from "react";
import { useNavigate } from "react-router";
import { habitsAtom } from "state/habits/habitState";
import { useRecoilValue } from "recoil";

const Habits = () => {
	const base = "Habits";
    const habits = useRecoilValue(habitsAtom);
	const {
		timestep,
		setTimestep,
		cycleTimestep,
		labels,
		labelDates,
		partitionsAsTimes,
	} = useHabits();
    const navigate = useNavigate();
	const timescaleProps = { labels, cycleTimestep, timestep, setTimestep };

	const compactHabits = useMemo(
		() =>
			habits?.length > 0 &&
			habits.map(({ habitData, completionData }, index) => {
				const compactHabitProps = {
					completionData,
					habitData,
					partitionsAsTimes,
					labelDates,
				};
				return <CompactHabit key={index} {...compactHabitProps} />;
			}),
		[habits, timestep]
	);

	return (
		<div className={`${base}`}>
			<Timescale {...timescaleProps} />
			{habits?.length > 0 && <ul className={`${base}__list`}>{compactHabits}</ul>}

            <NewHabitButton onClick={() => navigate('/newhabit')} />
		</div>
	);
};

export default Habits;
