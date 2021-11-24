import { useMutateCompletion } from "helpers/api/mutateCompletion";
import { useToggle } from "hooks/useToggle";
import { useCallback } from "react";
import { CompletionInstanceProps } from "types/CompletionInstance";

export function useHabitToggleInstance(props: CompletionInstanceProps) {
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

    return { checked, onClick } as const;
}
