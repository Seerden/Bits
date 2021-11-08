import { memo } from "react";
import { Entry } from "types/HabitEntry";
import HabitRangeInstance from "./HabitRangeInstance";
import HabitToggleInstance from "./HabitToggleInstance";

const CompletionInstance = memo(({ entry }: { entry: Entry[] }) => {
	const InstanceComponent =
		entry[0].completionType === "toggle"
			? HabitToggleInstance
			: HabitRangeInstance;

	return (
		<>
			{entry.map((instance, idx) => (
				<InstanceComponent key={idx} {...instance} />
			))}
		</>
	);
});

export default CompletionInstance;
