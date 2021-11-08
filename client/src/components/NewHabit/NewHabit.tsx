import c from "./NewHabit.module.scss";
import { useNewHabit } from "./useNewHabit";

// @todo: implement field validators in the form, instead of checking for validity in the submission handlers
// not required for MVP, so leave it as is for the time being

function Label({ htmlFor, children }) {
	return (
		<label htmlFor={htmlFor} className={c.Label}>
			{children}
		</label>
	);
}

const NewHabit = () => {
	const base = "NewHabit";
	const [newHabit, dispatchNewHabit, handleSubmitNewHabit] = useNewHabit();

	return (
		<form className={`${c[base]}`} onSubmit={handleSubmitNewHabit}>
			{/* SECTION / NAME */}
			<section className={`${c.NewHabit__field}`}>
				<Label htmlFor="name">Name</Label>
				<div className={`${c["NewHabit__field--group"]}`}>
					<input
						type="text"
						name="name"
						placeholder="Walk the dog"
						onBlur={(e) =>
							dispatchNewHabit({
								formField: "habitName",
								value: e.target.value,
							})
						}
					/>
				</div>
			</section>

			{/* SECTION / DESCRIPTION */}
			<section className={`${c["NewHabit__field"]}`}>
				<label htmlFor="description">Describe your habit</label>
				<div className={`${c["NewHabit__field--group"]}`}>
					<input
						type="text"
						name="description"
						placeholder="Optional"
						onBlur={(e) =>
							dispatchNewHabit({
								formField: "description",
								value: e.target.value,
							})
						}
					/>
				</div>
			</section>

			{/* SECTION / FREQUENCY */}
			<section className={`${c["NewHabit__field--frequency"]}`}>
				<label htmlFor="">Complete...</label>
				<div className={`${c["NewHabit__field--group"]}`}>
					<input type="number" name="frequency" />
					<span>times per</span>
					<select>
						{["day", "week", "month", "year"].map((t, index) => (
							<option key={index} value={t}>
								{t}
							</option>
						))}
					</select>
				</div>
			</section>

			{/* SECTION / TYPE + FREQUENCY */}
			<section className={`${c["NewHabit__field"]}`}>
				<label htmlFor="type">What type of habit?</label>
				<div className={`${c["NewHabit__field--group"]}`}>
					<select
						name="type"
						onChange={(e) =>
							dispatchNewHabit({
								formField: "completionType",
								value: e.target.value,
							})
						}
					>
						<option value="toggle">Toggle</option>
						<option value="interval">Range</option>
					</select>
					{newHabit.completionType === "interval" && (
						<div>
							<label htmlFor="completionInterval">Target</label>
							<input
								style={{ width: "3.5rem" }}
								type="number"
								name="completionInterval"
								onBlur={(e) =>
									dispatchNewHabit({
										formField: "completionInterval",
										value: +e.target.value,
									})
								}
							/>
						</div>
					)}
				</div>
			</section>

			{/* SECTION / DATE RANGE */}
			<section className={`${c["NewHabit__field--date"]}`}>
				<label htmlFor="">Track from/until</label>
				<div className={`${c["NewHabit__field--group"]}`}>
					<div>
						<label htmlFor="startDate">Start</label>
						<input
							type="date"
							name="startDate"
							onChange={(e) =>
								dispatchNewHabit({
									formField: "startDate",
									value: e.target.valueAsDate,
								})
							}
						/>
					</div>
					<div>
						<label htmlFor="endDate">End</label>
						<input
							type="date"
							name="endDate"
							onChange={(e) =>
								dispatchNewHabit({
									formField: "endDate",
									value: e.target.valueAsDate,
								})
							}
						/>
					</div>
				</div>
			</section>

			<input type="submit" value="Save habit" />
		</form>
	);
};

export default NewHabit;
