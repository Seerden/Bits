import HabitDetails from "components/HabitDetails/HabitDetails";
import HabitEntry from "components/HabitEntry/HabitEntry";
import { makeCompletionEntries } from "helpers/completion/completion-entries";
import { remainingCompletionsForSuccess } from "helpers/completion/completion-message";
import { memo } from "react";
import { BiExpandAlt, BiX } from "react-icons/bi";
import { Habit } from "../../../../shared/types/Habit";
import cs from "./CompactHabit.module.scss";
import { useCompactHabit } from "./useCompactHabit";

type CompactHabitProps = {
    habitId: Habit["habitId"];
    partitionsAsTimes: number[][];
};

const CompactHabit = memo(({ habitId, partitionsAsTimes }: CompactHabitProps) => {
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
    const entriesPerDay =
        habitData.completionTimescale === "day" ? habitData.completionFrequency : 1;
    const completionEntries = makeCompletionEntries({
        partitionsAsTimes,
        habitData,
        completionData,
        entriesPerDay,
    });
    const currentIntervalIsSuccessful =
        remainingCompletionsForSuccess(habitData, completionData) <= 0;

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
                className={cs.CompactHabit}
                style={{
                    outline: currentIntervalIsSuccessful && "2px solid green",
                }}
            >
                <span
                    title="Click to edit habit name"
                    onClick={() => {
                        if (!isEditing) {
                            setIsEditing((cur) => !cur);
                        }
                    }}
                    className={cs.NameField}
                    style={{
                        backgroundColor: isEditing ? "#222" : "",
                        outline: isEditing ? "2px solid #444" : "2px solid transparent",
                        fontSize: "inherit",
                        lineHeight: "inherit",
                        fontWeight: "inherit",
                    }}
                >
                    {!isEditing ? (
                        <span>{habitName}</span>
                    ) : (
                        <input
                            autoFocus
                            className={cs.NameField__input}
                            ref={inputRef}
                            type="text"
                            defaultValue={habitName}
                            onBlur={handleBlur}
                        />
                    )}
                </span>
                <ul className={cs.List}>
                    {completionEntries.map((partition, idx) => (
                        <HabitEntry key={idx} completionEntries={partition} />
                    ))}
                </ul>
                <button
                    title="Click to show habit details"
                    onClick={toggleDetails}
                    className={cs.Button}
                >
                    {!showDetails ? (
                        <BiExpandAlt className={cs.Expand} />
                    ) : (
                        <BiX className={cs.Close} />
                    )}
                </button>
            </div>
            {showDetails && (
                <HabitDetails
                    habitData={habitData}
                    completionData={completionData}
                    toggleDetails={toggleDetails}
                />
            )}
        </li>
    );
});

export default CompactHabit;
