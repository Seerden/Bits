import { Entry } from "types/HabitEntry";
import HabitRangeInstance from "./HabitRangeInstance";
import HabitToggleInstance from "./HabitToggleInstance";

const CompletionInstance = ({ entry }: { entry: Entry[]}) => {
    const base = "CompletionInstance";

    // render a ToggleInstance or RangeInstance depending on the Habit's completionType
    const InstanceComponent = entry[0].completionType === 'toggle' ? HabitToggleInstance : HabitRangeInstance;

    return (
        <>
            {entry.map((entry, idx) => <InstanceComponent key={idx} {...entry} />)}
        </>
    )
}

export default CompletionInstance