import { Habit } from "../../../../shared/types/Habit";
import { Completion } from "../../../../shared/types/Completion";
import "./CompactHabit.scss";
import HabitEntry from "components/HabitEntry/HabitEntry";
import { asTimes } from "helpers/time/asDates";
import { useEffect, useState } from "react";
import { usePutHabit } from "helpers/api/mutateHabits";
import { BiExpandAlt } from "react-icons/bi";
import cs from "./CompactHabit.module.scss";
import { useToggle } from "hooks/useToggle";
import HabitDetails from "components/HabitDetails/HabitDetails";

console.log(cs);

type CompactHabitProps = {
	habitData: Habit;
	completionData: Completion[];
	partitions: Date[][];
};

const CompactHabit = ({
	habitData,
	completionData,
	partitions,
}: CompactHabitProps) => {
	const base = "CompactHabit";
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [showDetails, toggleDetails] = useToggle({ initial: false });
	const [habitName, setHabitName] = useState<string>(habitData.habitName);
	const { mutate } = usePutHabit();

	const {
		completionType,
		completionFrequency,
		completionTimescale,
		completionInterval,
		habitId,
	} = habitData;

	const partitionsAsTimes = partitions.map(asTimes);
	const entriesPerDay = completionTimescale === "day" ? completionFrequency : 1;

	// @todo: turn this into a function
	const habitEntries = partitionsAsTimes.map((partition) =>
		partition.map((timestamp) => {
			const existingEntry = completionData.filter(
				(d) => new Date(d.habitEntryDate).getTime() === timestamp
			);

			return [...Array(entriesPerDay).keys()].map((entryIndex) => {
				const existingEntryAtIndex = existingEntry.filter(
					(entry) => entry.entryIndex === entryIndex
				)[0];
				const completed = existingEntryAtIndex?.completed || false;
				const rangeValue = existingEntryAtIndex?.rangeValue || 0;
				const completionId = existingEntryAtIndex?.completionId;

				return {
					_key: `${timestamp}-${entryIndex}`,
					habitEntryDate: new Date(timestamp),
					habitId,
					completed,
					rangeValue,
					completionType,
					completionInterval,
					entryIndex,
					completionId,
				};
			});
		})
	);

    useEffect(() => {
        console.log(habitEntries);
    }, [])

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
					{habitEntries.map((partition, idx) => (
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
