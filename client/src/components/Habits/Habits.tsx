import CompactHabit from "components/CompactHabit/CompactHabit";
import Timescale from "components/Timescale/Timescale";
import NewHabitButton from "./NewHabitButton/NewHabitButton";
import { useHabits } from "./useHabits";
import cs from "./Habits.module.scss";
import { useMemo } from "react";
import { useNavigate } from "react-router";

const Habits = () => {
	const { habits, timestep, cycleTimestep, labels, partitionsAsTimes } = useHabits();
	const navigate = useNavigate();

	const compactHabits = useMemo(
		() =>
			habits?.length > 0 &&
			habits.map(({ habitData }, index) => (
				<CompactHabit
					key={index}
					habitId={habitData.habitId}
					partitionsAsTimes={partitionsAsTimes}
				/>
			)),
		[habits, timestep, partitionsAsTimes]
	);

	return (
		<div className={cs.Habits}>
			<Timescale {...{ labels, cycleTimestep, timestep }} />

			{habits?.length > 0 && <ul>{compactHabits}</ul>}

			<NewHabitButton onClick={() => navigate("/newhabit")} />
		</div>
	);
};

export default Habits;
