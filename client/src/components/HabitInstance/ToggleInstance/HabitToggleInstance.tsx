import { RiCheckboxCircleFill, RiCheckboxBlankCircleFill } from "react-icons/ri";
import { CompletionInstanceProps } from "types/CompletionInstance";
import cs from "./HabitToggleInstance.module.scss";
import { useHabitToggleInstance } from "./useHabitToggleInstance";

const HabitToggleInstance = (props: CompletionInstanceProps) => {
	const { checked, onClick } = useHabitToggleInstance(props);

	const checkboxProps = {
		style: {
			fill: checked ? "green" : "grey",
		},
		className: cs.Button,
	};
	return (
		<button
			title="Click to toggle completion"
			onClick={onClick}
			className={cs.HabitToggleInstance}
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
