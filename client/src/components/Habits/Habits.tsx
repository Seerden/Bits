import Timescale from "components/Timescale/Timescale";
import { getDatesForLabels, getTimestepIndex, timesteps } from "helpers/time/dateList";
import { timescaleFormatters } from "helpers/time/format";
import { useCallback, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import { timescaleState } from "state/timescale";
import { useHabits } from "./useHabits";

const Habits = () => {
    const base = "Habits";
    const [timestep, setTimestep] = useRecoilState(timescaleState);
    const [length, setLength] = useState<number>(6);
    const formatter = timescaleFormatters[timestep];
    const data = useHabits();

    const cycleTimestep = useCallback(() => {
        const currentIndex = getTimestepIndex(timestep);
        setTimestep(timesteps[(currentIndex + 1) % timesteps.length])
    }, [timestep]);

    const { dates, labels } = useMemo(() => {
        const dates = getDatesForLabels(timestep, length)

        return {
            dates,
            labels: dates.map(entry => formatter(entry))
        }
    }, [timestep]);

    return (
        <div className={`${base}`}>
            <Timescale {...{labels, cycleTimestep, timestep, setTimestep}} />
        </div>
    )
}

export default Habits