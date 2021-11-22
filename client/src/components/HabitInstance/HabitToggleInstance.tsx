import { useMutateCompletion } from "helpers/api/mutateCompletion";
import { useToggle } from "hooks/useToggle";
import { useCallback } from "react";
import { RiCheckboxCircleFill, RiCheckboxBlankCircleFill } from "react-icons/ri";
import { Completion } from "../../../../shared/types/Completion";
import "./HabitToggleInstance.scss";

const HabitToggleInstance = (props: Partial<Completion>) => {
	const base = "HabitToggleInstance";
	const [checked, toggleChecked] = useToggle({ initial: props.completed });
	const { mutate } = useMutateCompletion();

	const handleClick = useCallback(() => {
		const { completionId, habitId, habitEntryDate, entryIndex } = props;

		mutate({
			completionId,
			completed: !checked, // happens in same render cycle as update, so `checked` will be one step behind
			habitId,
			habitEntryDate,
			entryIndex,
		});
	}, [checked]);

	const onClick = (e) => {
		e.preventDefault();
		toggleChecked();
		handleClick();
	};

	const checkboxProps = {
		style: {
			fill: checked ? "green" : "grey",
		},
        className: `${base}__button`
        
	};
	return (
		<button
            title="Click to toggle completion"
			onClick={onClick}
			className={`${base}`}
		>
			{checked ? (
				<RiCheckboxCircleFill {...checkboxProps} />
			) : (
				<RiCheckboxBlankCircleFill {...checkboxProps} />
			)}
		</button>
	);
};

export default HabitToggleInstance;
