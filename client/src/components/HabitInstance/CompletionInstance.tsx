import { memo } from "react";
import { CompletionInstanceProps } from "types/CompletionInstance";
import { Habit } from "../../../../shared/types/Habit";
import HabitRangeInstance from "./RangeInstance/HabitRangeInstance";
import HabitToggleInstance from "./ToggleInstance/HabitToggleInstance";

type MapProps = {
	[k in Habit["completionType"]]: typeof HabitToggleInstance | typeof HabitRangeInstance;
};

const completionTypeToComponentMap: MapProps = {
	toggle: HabitToggleInstance,
	interval: HabitRangeInstance,
};

const CompletionInstance = memo(({ entry }: { entry: CompletionInstanceProps[] }) => {
	const InstanceComponent = completionTypeToComponentMap[entry[0].completionType];

	return (
		<>
			{entry.map((instance, idx) => (
				<InstanceComponent key={idx} {...instance} />
			))}
		</>
	);
});

export default CompletionInstance;
