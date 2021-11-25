import { usePutHabit } from "helpers/api/mutateHabits";
import { useClickOutside } from "hooks/useClickOutside";
import { useToggle } from "hooks/useToggle";
import { useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { habitsState } from "state/habits/habitFamily";
import { Habit } from "../../../../shared/types/Habit";

export function useCompactHabit(habitId: Habit["habitId"]) {
    const { habitData, completionData } = useRecoilValue(habitsState(habitId));
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [habitName, setHabitName] = useState<string>(habitData.habitName);
    const { mutate } = usePutHabit();
    const [showDetails, toggleDetails] = useToggle({ initial: false });

    function handleBlur(e) {
        /* e is either an event or inputRef.current (referring to an HTML input element)
            if it's an event, it has property .target. 
            if it's an HTML input, it has property .value
        */
        const newName = e.target ? e.target.value : e.value;
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
        if (isEditing) {
            handleBlur(inputRef.current);
        }
    };

    useClickOutside(inputRef, handleClickOutside);

    return {
        habitData,
        completionData,
        isEditing,
        setIsEditing,
        showDetails,
        toggleDetails,
        handleBlur,
        habitName,
        inputRef,
    } as const;
}
