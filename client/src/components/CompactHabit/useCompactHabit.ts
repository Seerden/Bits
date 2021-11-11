import { usePutHabit } from "helpers/api/mutateHabits";
import { useClickOutside } from "hooks/useClickOutside";
import { useToggle } from "hooks/useToggle";
import { useRef, useState } from "react";
import { Habit } from "../../../../shared/types/Habit";

export function useCompactHabit(habitData: Habit) {
	const { habitName: name, habitId } = habitData;
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [habitName, setHabitName] = useState<string>(name);
	const { mutate } = usePutHabit();
	const [showDetails, toggleDetails] = useToggle({ initial: false });

	function handleBlur(e) {
		const newName = e.target ? e.target.value : e.value;  // e is either an event or inputRef.current
		setHabitName(newName);
		mutate({
			field: "habitName",
			habitToUpdate: {
				habitName: newName,
				habitId,
			},
		});
		setIsEditing(false);
	}

	const inputRef = useRef(null);
	const handleClickOutside = (e) => {
        if (isEditing && inputRef.current && !inputRef.current.contains(e.target)) {
			handleBlur(inputRef.current);
		}
	};

	useClickOutside(inputRef, handleClickOutside);

	return {
		isEditing,
		setIsEditing,
		showDetails,
		toggleDetails,
		handleBlur,
		habitName,
		inputRef,
	} as const;
}
