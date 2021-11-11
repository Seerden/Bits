import HabitRangeInstance from "components/HabitInstance/HabitRangeInstance";
import HabitToggleInstance from "components/HabitInstance/HabitToggleInstance";
import c from "./NewHabit.module.scss";
import { useNewHabit } from "./useNewHabit";

// @todo: implement field validators in the form, instead of checking for validity in the submission handlers
// not required for MVP, so leave it as is for the time being

function Section({ children }) {
	return <section className={c.Section}>{children}</section>;
}

function Label(props) {
	return (
		<label htmlFor="" className={c.Label}>
			{props.children}
		</label>
	);
}

function Form(props) {
	return <form className={c.Form}>{props.children}</form>;
}

const NewHabit = () => {
	const base = "NewHabit";
	const [newHabit, dispatchNewHabit, handleSubmitNewHabit] = useNewHabit();

	return (
		<Form>
			<Section>
				<Label>Name</Label>
				<input type="text" className={c.Input} style={{ width: "8rem" }} />
			</Section>

			<Section>
				<Label>Description</Label>
				<input className={c.Input} type="text" style={{ width: "10rem" }} />
			</Section>

			<Section>
				<Label>Type</Label>
				<select className={c.Select}>
					<option className={c.Option} value="toggle">
						Toggle
					</option>
					<option className={c.Option} value="interval">
						Interval
					</option>
				</select>
			</Section>
			<Section>
				<Label>Occurrence</Label>
				<div className={c.Field}>
					<input className={c.Input} type="number" style={{ width: "2rem" }} />
					<span>time(s) per</span>
					<select className={c.Select}>
						<option className={c.Option} value="day">
							day
						</option>
					</select>
				</div>
			</Section>

			<Section>
				<Label>Date range</Label>
				<div className={c.Field}>
					<label className={c.SubLabel}>Start</label>
					<input type="date" className={c.Input} />
				</div>
				<div className={c.Field}>
					<label className={c.SubLabel}>End</label>
					<input type="date" className={c.Input} />
				</div>
			</Section>
			<button className={c.Button}>Add new habit</button>
		</Form>
	);
};

export default NewHabit;
