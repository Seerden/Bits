import "./Timescale.scss";
import { Timestep } from "types/time";

interface TimescaleProps {
    timestep: Timestep;
    labels: string[];
    cycleTimestep: () => void;
}

const Timescale = ({ labels, timestep, cycleTimestep }: TimescaleProps) => {
    return (
        <div className="Timescale">
            <ul className="Timescale__list">
                {labels.map((label, index) => (
                    <li className="Timescale__list--entry" key={index}>
                        {label}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Timescale;
