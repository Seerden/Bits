import CompactHabit from "components/CompactHabit/CompactHabit";
import Timescale from "components/Timescale/Timescale";
import dayjs from "dayjs";
import { getDatesForLabels, getTimestepIndex, listDatesBetween, timesteps } from "helpers/time/dateList";
import { timescaleFormatters } from "helpers/time/format";
import { partitionDates } from "helpers/time/partitionDates";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import { timescaleState } from "state/timescale";
import { HabitResponse } from "../../../../shared/types/Habit";
import { useHabits } from "./useHabits";

const Habits = () => {
    const base = "Habits";
    const [timestep, setTimestep] = useRecoilState(timescaleState);
    const [length, setLength] = useState<number>(0);
    const formatter = timescaleFormatters[timestep];
    const habits: HabitResponse[] = useHabits();

    // @todo: move to useHabits, or split up into multiple hooks
    const cycleTimestep = useCallback(() => {
        const currentIndex = getTimestepIndex(timestep);
        setTimestep(timesteps[(currentIndex + 1) % timesteps.length])
    }, [timestep]);

    const [labelDates, labels, datesInRange, partitions] = useMemo(() => {
        const endOfRange = dayjs(new Date()).startOf(timestep).add(1, timestep);

        const labelDates = getDatesForLabels(timestep, length-1)
        const datesInRange = listDatesBetween(labelDates[0], endOfRange);

        return [
            labelDates,
            labelDates.map(entry => formatter(entry)),
            datesInRange,
            partitionDates(
                datesInRange.map(d => d.toDate()), 
                labelDates.map(d => d.toDate()), 
                timestep
            )
        ]
    }, [timestep]);

    return (
        <div className={`${base}`}>
            <Timescale {...{ labels, cycleTimestep, timestep, setTimestep }} />
            {habits?.length > 0 &&
                <>
                    <ul>
                        {
                            habits.map(({ habitData, completionData }, index) =>
                                <CompactHabit 
                                    key={index} 
                                    {...{ 
                                        completionData, 
                                        habitData,
                                        partitions
                                    }} 
                                />
                            )
                        }
                    </ul>
                </>
            }
        </div>
    )
}

export default Habits