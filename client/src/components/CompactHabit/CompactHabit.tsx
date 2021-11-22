import { Habit } from "../../../../shared/types/Habit";
import "./CompactHabit.scss";
import HabitEntry from "components/HabitEntry/HabitEntry";
import { BiExpandAlt, BiX } from "react-icons/bi";
import cs from "./CompactHabit.module.scss";
import HabitDetails from "components/HabitDetails/HabitDetails";
import { makeCompletionEntries } from "helpers/completion/completionEntries";
import { useCompactHabit } from "./useCompactHabit";
import { memo } from "react";
import { remainingCompletionsForSuccess } from "helpers/completion/completionMessage";

type CompactHabitProps = {
	habitId: Habit["habitId"];
	partitionsAsTimes: number[][];
};

const CompactHabit = memo(({ habitId, partitionsAsTimes }: CompactHabitProps) => {
	const base = "CompactHabit";
	const {
		habitData,
		completionData,
		habitName,
		isEditing,
		setIsEditing,
		showDetails,
		toggleDetails,
		handleBlur,
		inputRef,
	} = useCompactHabit(habitId);
	const { completionFrequency, completionTimescale } = habitData;
	const entriesPerDay = completionTimescale === "day" ? completionFrequency : 1;
	const completionEntries = makeCompletionEntries({
		partitionsAsTimes,
		habitData,
		completionData,
		entriesPerDay,
	});
	const currentIntervalIsSuccessful =
		remainingCompletionsForSuccess(habitData, completionData) === 0;

	return (
		<li
			style={{
				listStyle: "none",
				display: "flex",
				flexDirection: "column",
				position: "relative",
			}}
		>
			<div
				className={`${base}`}
				style={{
					outline: currentIntervalIsSuccessful && "2px solid green",
				}}
			>
				<span title="Click to edit habit name" className={`${base}__name`}>
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
				<button
					title="Click to show habit details"
					onClick={toggleDetails}
					className={cs.Button}
				>
					{!showDetails ? <BiExpandAlt className={cs.Expand} /> : <BiX className={cs.Close} />}
				</button>
			</div>
			{showDetails && (
				<HabitDetails
					key={new Date().toISOString()}
					habitData={habitData}
					completionData={completionData}
					toggleDetails={toggleDetails}
				/>
			)}
		</li>
	);
});

export default CompactHabit;
