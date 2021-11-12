import "./Timescale.scss";
import { SetterOrUpdater } from "recoil";
import { Timestep } from "types/time";
import { timestepDisplayStringMap } from "helpers/time/timesteps";

interface TimescaleProps {
	length?: number;
	timestep: Timestep;
	labels: string[];
	setTimestep?: SetterOrUpdater<Timestep>;
	cycleTimestep: () => any;
}

const Timescale = ({
	labels,
	timestep,
	cycleTimestep,
}: TimescaleProps) => {
	const base = "Timescale";

	return (
		<div className={`${base}`}>
			<ul className={`${base}__list`}>
				{labels.map((label, index) => (
					<li className={`${base}__list--entry`} key={index}>
						{label}
					</li>
				))}
			</ul>
			<button className={`${base}__cycle`} onClick={cycleTimestep}>
				{timestepDisplayStringMap[timestep].toUpperCase()}
			</button>
		</div>
	);
};

export default Timescale;
