import { Completion } from "../../../shared/types/Completion";
import { Habit } from "../../../shared/types/Habit";
import { Maybe } from "../../../shared/types/Maybe";

export type CompletionInstanceProps = {
	_key: string;
	habitId: Habit["habitId"];
	habitEntryDate: Completion["habitEntryDate"];
	completionType: Habit["completionType"];
	completionInterval: Habit["completionInterval"];
	completed: Completion["completed"];
	rangeValue: Completion["rangeValue"];
	completionId: Maybe<Completion["completionId"]>;
	entryIndex: Completion["entryIndex"];
	created: Habit["created"];
	startDate: Habit["startDate"];
	endDate: Habit["endDate"];
};
