import HabitToggleInstance from "components/HabitInstance/HabitToggleInstance";
import { Completion } from "../../../../shared/types/Completion";
import './HabitEntry.scss';

type HabitEntryProps = {
    dateOrDates: Date | Date[],
    completionEntries: Completion | Completion[]
}

const HabitEntry = ({ dateOrDates, completionEntries }: HabitEntryProps) => {
    const base = "HabitEntry";

    return (
        <div className={`${base}`}>
            {/* {completionInstances} */}
        </div>
    )
}

export default HabitEntry