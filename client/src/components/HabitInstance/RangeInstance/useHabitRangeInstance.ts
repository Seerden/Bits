import { useMutateCompletion } from "helpers/api/mutateCompletion";
import { useMemo, useState } from "react";
import { CompletionInstanceProps } from "types/CompletionInstance";

export function useHabitRangeInstance(props: CompletionInstanceProps) {
	const { habitId, rangeValue, completionInterval, habitEntryDate, entryIndex } = props;
	const [sliderValue, setSliderValue] = useState<number>(rangeValue);
	const { mutate } = useMutateCompletion();

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
