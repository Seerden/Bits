import { useState } from "react";

type UseToggleProps = {
	initial: boolean;
};

export function useToggle({ initial = true }: UseToggleProps) {
	const [state, setState] = useState<boolean>(initial);

	function toggleState() {
		setState((cur) => !cur);
	}

	return [state, toggleState] as const;
}
