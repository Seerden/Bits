import './Timescale.scss';
import type { TimescaleType } from '../../../../shared/types/Timescale';
import { getDatesForLabels } from 'helpers/time/dateList';
import { timescaleFormatters } from 'helpers/time/format';
import { useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { timescaleState } from 'state/timescale';

interface TimescaleProps  {
    length?: number
}

const Timescale = ({ length = 6 }: TimescaleProps) => {
    const base = "Timescale";
    const [timescale, setTimescale] = useRecoilState(timescaleState)
    const formatter = timescaleFormatters[timescale];

    const { dates, labels } = useMemo(() => {
        const dates = getDatesForLabels(timescale, length)

        return {
            dates,
            labels: dates.map(entry => formatter(entry))
        }
    }, [timescale])

return (
    <div className={`${base}`}>
        <ul className={`${base}__label`}>
            {
                labels.map(label => <li>{label}</li>)
            }
        </ul>
    </div>
)
}

export default Timescale