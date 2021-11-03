import { useEffect } from "react";
import { Completion } from "../../../../shared/types/Completion";
import HabitRangeInstance from "./HabitRangeInstance";
import HabitToggleInstance from "./HabitToggleInstance";

const CompletionInstance = (props: Partial<Completion>) => {
    const base = "CompletionInstance";

    const InstanceComponent = props.completionType === 'toggle' ? HabitToggleInstance : HabitRangeInstance;

    return (
        <>
            {/* <InstanceComponent {...props} /> */}
        </>
    )
}

export default CompletionInstance