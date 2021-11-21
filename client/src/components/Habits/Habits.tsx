import CompactHabit from "components/CompactHabit/CompactHabit";
import Timescale from "components/Timescale/Timescale";
import NewHabitButton from "./NewHabitButton/NewHabitButton";
import { useHabits } from "./useHabits";
import cs from "./Habits.module.scss";
import { memo, useMemo } from "react";
import { useNavigate } from "react-router";

const Habits = memo(() => {
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
			{habits?.length ? (
				<>
					<Timescale {...{ labels, cycleTimestep, timestep }} />

					{compactHabits}
				</>
			) : (
				<>It appears you haven't started tracking any habits yet.</>
			)}

			<NewHabitButton onClick={() => navigate("/newhabit")} />
		</div>
	);
});

export default Habits;
