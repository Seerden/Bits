import { useEffect } from "react";
import type { CompletionInstanceProps } from "types/CompletionInstance";
import HabitRangeInstance from "./HabitRangeInstance";
import HabitToggleInstance from "./HabitToggleInstance";

const CompletionInstance = (props: CompletionInstanceProps) => {
    const base = "CompletionInstance";

    // render a ToggleInstance or RangeInstance depending on the Habit's completionType
    const InstanceComponent = props.completionType === 'toggle' ? HabitToggleInstance : HabitRangeInstance;

    return (
        <>
            <InstanceComponent {...props} />
        </>
    )
}

export default CompletionInstance