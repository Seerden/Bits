import { Habit } from "../../../../shared/types/Habit";
import { Completion } from "../../../../shared/types/Completion";
import "./CompactHabit.scss";
import HabitEntry from "components/HabitEntry/HabitEntry";
import { BiExpandAlt, BiX } from "react-icons/bi";
import cs from "./CompactHabit.module.scss";
import HabitDetails from "components/HabitDetails/HabitDetails";
import { makeCompletionEntries } from "helpers/completion/completionEntries";
import { Dayjs } from "dayjs";
import { useCompactHabit } from "./useCompactHabit";
import { memo } from "react";

type CompactHabitProps = {
	habitData: Habit;
	completionData: Completion[];
	partitionsAsTimes: number[][];
	labelDates: Dayjs[];
};

const CompactHabit = memo(({
	habitData,
	completionData,
	partitionsAsTimes,
	labelDates,
}: CompactHabitProps) => {
	const base = "CompactHabit";
	const {
		habitName,
		isEditing,
		setIsEditing,
		showDetails,
		toggleDetails,
		handleBlur,
		inputRef,
	} = useCompactHabit(habitData);
	const { completionFrequency, completionTimescale } = habitData;
	const entriesPerDay = completionTimescale === "day" ? completionFrequency : 1;
	const completionEntries = makeCompletionEntries({
		partitionsAsTimes,
		completionData,
		entriesPerDay,
		...habitData, // don't need all of habitData, but it's shortest to just pass the whole entry
	});

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
							ref={inputRef}
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
					{!showDetails ? <BiExpandAlt className={cs.Expand} /> : <BiX className={cs.Close} />}
				</button>
			</div>
			{showDetails && (
				<HabitDetails
                    key={new Date().toISOString()}
					habitData={habitData}
					completionData={completionData}
				/>
			)}
		</li>
	);
});

export default CompactHabit;
