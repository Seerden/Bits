import CompactHabit from "components/CompactHabit/CompactHabit";
import Timescale from "components/Timescale/Timescale";
import { useHabits } from "./useHabits";

const Habits = () => {
    const base = "Habits";
    const {
        data: habits,
        timestep,
        setTimestep,
        cycleTimestep,
        labels,
        partitions
    } = useHabits();

    const timescaleProps = { labels, cycleTimestep, timestep, setTimestep };

    return (
        <div
            className={`${base}`}
        >
            <Timescale {...timescaleProps} />
            {
                habits?.length > 0 &&
                <ul className={`${base}__list`}>
                    {habits.map(({ habitData, completionData }, index) => {
                        const compactHabitProps = { completionData, habitData, partitions };
                        return <CompactHabit key={index} {...compactHabitProps} />
                    })}
                </ul>
            }
        </div>
    )
}

export default Habits