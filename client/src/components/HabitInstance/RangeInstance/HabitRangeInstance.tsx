import "./HabitRangeInstance.scss";
import { useMemo, useState } from "react";
import { CompletionInstanceProps } from "types/CompletionInstance";
import { useMutateCompletion } from "helpers/api/mutateCompletion";

const HabitRangeInstance = (props: CompletionInstanceProps) => {
	const base = "HabitRangeInstance";
    const {
        habitId,
	rangeValue,
	completionInterval,
	habitEntryDate,
	entryIndex,
    } = props;
	const [sliderValue, setSliderValue] = useState<number>(rangeValue);
	const { mutate } = useMutateCompletion();

	const progress = useMemo(() => {
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
		const newValue = value > 0 ? value : 0;

		setSliderValue(+newValue);
	}

	return (
		<div className={`${base}`}>
			<input
				className={`${base}__slider ${progress}`}
				type="range"
				value={sliderValue}
				onChange={handleInputChange}
				onMouseUp={handleInputBlur}
				max={completionInterval}
			/>
			<input
				className={`${base}__slider--input`}
				type="number"
				value={sliderValue}
				onChange={handleInputChange}
				onBlur={handleInputBlur}
			/>
		</div>
	);
};

export default HabitRangeInstance;
