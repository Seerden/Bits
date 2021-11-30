import { useMutateCompletion } from "helpers/api/completion-mutate";
import { useEffect, useMemo, useState } from "react";
import { useHabitsState } from "state/habits/habitFamily";
import { CompletionInstanceProps } from "types/CompletionInstance";

export function useHabitRangeInstance(props: CompletionInstanceProps) {
    const { habitId, rangeValue, completionInterval, habitEntryDate, entryIndex } = props;
    const [sliderValue, setSliderValue] = useState<number>(rangeValue);
    const { data, mutate } = useMutateCompletion();
    const { updateHabitCompletionData } = useHabitsState();

    useEffect(() => {
        if (data) updateHabitCompletionData(props.habitId, data);
    }, [data]);

    const progressString = useMemo(() => {
        return sliderValue >= completionInterval
            ? "completed"
            : sliderValue >= completionInterval / 2
            ? "underway"
            : "incomplete";
    }, [sliderValue]);

    function handleInputBlur(e) {
        const { value } = e.target;
        const newValue = value > 0 ? value : 0;

        setSliderValue(+newValue);

        mutate({
            habitId,
            rangeValue: +newValue,
            habitEntryDate,
            entryIndex,
        });
    }

    function handleInputChange(e) {
        const { value } = e.target;

        if (+value >= 0) {
            setSliderValue(+value);
        }
    }

    return {
        progressString,
        sliderValue,
        handleInputChange,
        handleInputBlur,
    } as const;
}
