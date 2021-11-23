import CompactHabit from "components/CompactHabit/CompactHabit";
import Timescale from "components/Timescale/Timescale";
import NewHabitButton from "./NewHabitButton/NewHabitButton";
import { useHabits } from "./useHabits";
import cs from "./Habits.module.scss";
import { memo, useMemo } from "react";
import { useNavigate } from "react-router";

const Habits = memo(() => {
	const { habitIds, timestep, cycleTimestep, labels, partitionsAsTimes } = useHabits();
	const navigate = useNavigate();

	// derive <CompactHabit />[] from habits state
	const compactHabits = useMemo(
		() =>
			habitIds?.length > 0 &&
			habitIds.map((habitId, index) => (
				<CompactHabit key={index} habitId={habitId} partitionsAsTimes={partitionsAsTimes} />
			)),
		[habitIds, timestep, partitionsAsTimes]
	);

	return (
		<div className={cs.Habits}>
			{habitIds.length > 0 ? (
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
