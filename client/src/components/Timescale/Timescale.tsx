import './Timescale.scss';
import type { TimescaleType } from '../../../../shared/types/Timescale';

interface TimescaleProps extends TimescaleType {
    length?: number
}

const Timescale = ({ timescale, length = 7 }: TimescaleProps) => {
    const base = "Timescale";

    const timescaleItems = [...Array(length).keys()].map(entry => entry) // map dates in range of timescale to habit table headers
    
    return (
        <div className={`${base}`}>
            A
        </div>
    )
}

export default Timescale

type DateEntryProps = {
    label: string,
}

const DateEntry = ({ label }: DateEntryProps) => {

    return (
        <li className="DateEntry">
            { label }
        </li>
    )
}