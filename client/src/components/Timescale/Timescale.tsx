import './Timescale.scss';
import { getDatesForLabels, getTimestepIndex, timestepDisplayStringMap, timesteps } from 'helpers/time/dateList';
import { timescaleFormatters } from 'helpers/time/format';
import { useCallback, useMemo } from 'react';
import { SetterOrUpdater, useRecoilState } from 'recoil';
import { Timestep } from 'types/time';

interface TimescaleProps {
    length?: number,
    timestep: Timestep,
    labels: string[],
    setTimestep: SetterOrUpdater<Timestep>,
    cycleTimestep: () => any
}

const Timescale = ({ 
    length = 6,
    labels,
    timestep,
    setTimestep,
    cycleTimestep
}: TimescaleProps) => {
    const base = "Timescale";
    
    return (
        <div className={`${base}`}>
            <ul className={`${base}__list`}>
                {
                    labels.map((label, index) =>
                        <li
                            className={`${base}__list--entry`}
                            key={index}
                        >
                            {label}
                        </li>
                    )
                }
            </ul>
            <button
                className={`${base}__cycle`}
                onClick={cycleTimestep}
            >
                {timestepDisplayStringMap[timestep].toUpperCase()}
            </button>
        </div>
    )
}

export default Timescale