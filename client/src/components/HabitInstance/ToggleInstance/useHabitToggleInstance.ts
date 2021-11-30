import { useMutateCompletion } from "helpers/api/completion-mutate";
import { useToggle } from "hooks/useToggle";
import { useCallback, useEffect } from "react";
import { useHabitsState } from "state/habits/habitFamily";
import { CompletionInstanceProps } from "types/CompletionInstance";

export function useHabitToggleInstance(props: CompletionInstanceProps) {
    const [checked, toggleChecked] = useToggle({ initial: props.completed });
    const { data, mutate } = useMutateCompletion();
    const { updateHabitCompletionData } = useHabitsState();

    useEffect(() => {
        if (data) {
            updateHabitCompletionData(props.habitId, data);
        }
    }, [data]);

    const mutateCompletion = useCallback(() => {
        const { completionId, habitId, habitEntryDate, entryIndex } = props;

        /* @todo: the only difference between RangeInstance and ToggleInstance is the presence/absence of completed/rangeValue
            make sure that we keep that in mind when creating this functionality in useHabitRangeInstance
        */
        const newOrUpdatedCompletion = {
            completionId,
            completed: !checked, // happens in same render cycle as update, so `checked` will be one step behind
            habitId,
            habitEntryDate,
            entryIndex,
            rangeValue: null,
        };

        mutate(newOrUpdatedCompletion);
    }, [checked]);

    /**
     * Handler that toggles checked state and triggers mutateCompletion
     */
    function onClick(e) {
        e.preventDefault();
        toggleChecked();
        mutateCompletion();
    }

    return { checked, onClick } as const;
}
