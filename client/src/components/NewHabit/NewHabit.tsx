import "./NewHabit.scss";
import { useNewHabit } from "./useNewHabit";

// @todo: implement field validators in the form, instead of checking for validity in the submission handlers
// not required for MVP, so leave it as is for the time being

const NewHabit = () => {
	const base = "NewHabit";
	const [newHabit, dispatchNewHabit, handleSubmitNewHabit] = useNewHabit();

	return (
		<form className={`${base}`} onSubmit={handleSubmitNewHabit}>
			<section className={`${base}__field`}>
				<label htmlFor="name">Name</label>
				<section className="field__group">
					<input
						type="text"
						name="name"
						onBlur={(e) =>
							dispatchNewHabit({
								formField: "habitName",
								value: e.target.value,
							})
						}
					/>
				</section>
			</section>

			<section className={`${base}__field`}>
				<label htmlFor="description">Describe your habit</label>
                <section className={`field__group`}>
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
                </section>
			</section>

			<section className={`${base}__field--frequency`}>
				<label htmlFor="">Complete...</label>
				<section>
					<input type="number" name="frequency" />
					<span>times per</span>
					<select>
						{["day", "week", "month", "year"].map((t) => (
							<option value={t}>{t}</option>
						))}
					</select>
				</section>
			</section>

			<section className={`${base}__field`}>
				<label htmlFor="type">What type of habit?</label>
				<section className="field__group">
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
						<section>
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
						</section>
					)}
				</section>
			</section>

			<section className={`${base}__field--date`}>
				<label htmlFor="">Track from/until</label>
				<section className="field__group">
					<section>
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
					</section>
					<section>
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
					</section>
				</section>
			</section>

			<input type="submit" value="Save habit" />
		</form>
	);
};

export default NewHabit;
