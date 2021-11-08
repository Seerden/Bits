import { Habit } from "../../../../shared/types/Habit";
import { Completion } from "../../../../shared/types/Completion";
import "./CompactHabit.scss";
import HabitEntry from "components/HabitEntry/HabitEntry";
import { useState } from "react";
import { usePutHabit } from "helpers/api/mutateHabits";
import { BiExpandAlt } from "react-icons/bi";
import cs from "./CompactHabit.module.scss";
import { useToggle } from "hooks/useToggle";
import HabitDetails from "components/HabitDetails/HabitDetails";
import { makeCompletionEntries } from "helpers/completion/completionEntries";

type CompactHabitProps = {
	habitData: Habit;
	completionData: Completion[];
	partitionsAsTimes: number[][];
};

const CompactHabit = ({
	habitData,
	completionData,
	partitionsAsTimes,
}: CompactHabitProps) => {
	const base = "CompactHabit";
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [showDetails, toggleDetails] = useToggle({ initial: false });
	const [habitName, setHabitName] = useState<string>(habitData.habitName);
	const { mutate } = usePutHabit();

	const { completionFrequency, completionTimescale, habitId } = habitData;
	const entriesPerDay = completionTimescale === "day" ? completionFrequency : 1;
	const completionEntries = makeCompletionEntries({
		partitionsAsTimes,
		completionData,
		entriesPerDay,
		...habitData, // don't need all of habitData, but it's shortest to just pass the whole entry
	});

	function handleBlur(e) {
		const newName = e.target.value;
		setHabitName(newName);

		mutate({
			field: "habitName",
			habitToUpdate: {
				habitName: newName,
				habitId,
			},
		});

		setIsEditing((cur) => !cur);
	}

	return (
		<li
			style={{
				listStyle: "none",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<div className={`${base}`}>
				<span className={`${base}__name`}>
					{!isEditing ? (
						<span onClick={() => setIsEditing((cur) => !cur)}>{habitName}</span>
					) : (
						<input
							className={`${base}__name--input`}
							type="text"
							defaultValue={habitName}
							onBlur={handleBlur}
						/>
					)}
				</span>
				<ul className={`${base}__list`}>
					{completionEntries.map((partition, idx) => (
						<HabitEntry key={idx} completionEntries={partition} />
					))}
				</ul>
				<button onClick={toggleDetails} className={cs.Button}>
					<BiExpandAlt className={cs.Expand} />
				</button>
			</div>
			{showDetails && <HabitDetails {...habitData} {...completionData} />}
		</li>
	);
};

export default CompactHabit;
