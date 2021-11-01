import CompactHabit from "components/CompactHabit/CompactHabit";
import Timescale from "components/Timescale/Timescale";
import { getDatesForLabels, getTimestepIndex, listDatesBetween, timesteps } from "helpers/time/dateList";
import { timescaleFormatters } from "helpers/time/format";
import { useCallback, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import { timescaleState } from "state/timescale";
import { HabitResponse } from "../../../../shared/types/Habit";
import { useHabits } from "./useHabits";

const Habits = () => {
    const base = "Habits";
    const [timestep, setTimestep] = useRecoilState(timescaleState);
    const [length, setLength] = useState<number>(6);
    const formatter = timescaleFormatters[timestep];
    const habits: HabitResponse[] = useHabits();

    const cycleTimestep = useCallback(() => {
        const currentIndex = getTimestepIndex(timestep);
        setTimestep(timesteps[(currentIndex + 1) % timesteps.length])
    }, [timestep]);

    const [labelDates, labels, datesInRange] = useMemo(() => {
        const labelDates = getDatesForLabels(timestep, length)

        return [
            labelDates,
            labelDates.map(entry => formatter(entry)),
            listDatesBetween(labelDates[0], labelDates[labelDates.length-1])
        ]
    }, [timestep]);

    return (
        <div className={`${base}`}>
            <Timescale {...{ labels, cycleTimestep, timestep, setTimestep }} />
            { habits && 
                habits.map(({ habitData, completionData }) => <CompactHabit {...{completionData, habitData}} />)
            }
        </div>
    )
}

export default Habits