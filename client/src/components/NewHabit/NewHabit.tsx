import dayjs from "dayjs";
import { NewHabit } from "../../../../shared/types/Habit";
import c from "./NewHabit.module.scss";
import { Description, Form, Label, Row, Section } from "./Primitives";
import { useNewHabit } from "./useNewHabit";

const NewHabit = (props) => {
	const [newHabit, dispatchNewHabit, handleSubmitNewHabit] = useNewHabit();

	return (
		<Form>
			<h2>Create a new habit</h2>

			<Row label="Name and description">
				<Section>
					<Label>Name</Label>
					<Description>Name your habit. You can always change this later.</Description>
					<input
						defaultValue={newHabit.habitName || ""}
						onBlur={(e) =>
							dispatchNewHabit({ formField: "habitName", value: e.target.value })
						}
						type="text"
						className={c.Input}
						style={{ width: "8rem" }}
					/>
				</Section>

				<Section>
					<Label>Description</Label>
					<Description>Optional</Description>
					<input
						defaultValue={newHabit.description || ""}
						onBlur={(e) =>
							dispatchNewHabit({ formField: "description", value: e.target.value })
						}
						className={c.Input}
						type="text"
						style={{ width: "10rem" }}
					/>
				</Section>
			</Row>

			<Row label="Completion settings">
				<Section>
					<Label>Type</Label>
					<Description>
						A toggle means you either complete the task or not, but with an interval you
						can specify a number (e.g. "5000 steps").
					</Description>
					<div
						style={{
							display: "inline-flex",
							flexDirection: "row",
							gap: "2.5rem",
							alignItems: "center",
						}}
					>
						<select
							defaultValue={newHabit.completionType}
							onChange={(e) =>
								dispatchNewHabit({
									formField: "completionType",
									value: e.target.value,
								})
							}
							className={c.Select}
						>
							<option className={c.Option} value="toggle">
								Toggle
							</option>
							<option className={c.Option} value="interval">
								Interval
							</option>
						</select>
						{newHabit.completionType === "interval" && (
							<div>
								<span>Target: </span>
								<input
									className={c.Input}
									type="number"
									defaultValue={newHabit.completionInterval || 1}
									style={{
										display: "inline-flex",
										width: "4rem",
									}}
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
				</Section>

				<Section>
					<Label>Occurrence</Label>
					<Description>Choose how often you want to perform this habit.</Description>
					<div className={c.Field}>
						<input
							onChange={(e) =>
								dispatchNewHabit({
									formField: "completionFrequency",
									value: +e.target.value,
								})
							}
							className={c.Input}
							type="number"
							style={{ width: "2rem" }}
							value={newHabit.completionFrequency || 1}
							min={1}
						/>
						<span>time(s) per</span>
						<select
							className={c.Select}
							onChange={(e) =>
								dispatchNewHabit({
									formField: "completionTimescale",
									value: e.target.value,
								})
							}
						>
							{["day", "week", "month", "year"].map((value) => (
								<option key={value} className={c.Option} value={value}>
									{value}
								</option>
							))}
						</select>
					</div>
				</Section>
			</Row>

			<Row label="Tracking period">
				<Section>
					<Label>Date range</Label>
					<Description>
						Specify how long you want to track the habit for. You don't have to fill in
						the 'End' date if you want to keep tracking forever.
					</Description>
					{[
						{ formField: "startDate", label: "Start" },
						{ formField: "endDate", label: "End" },
					].map(({ formField, label }, index) => (
						<div key={index} className={c.Field}>
							<label className={c.SubLabel}>{label}</label>
							<input
								onChange={(e) =>
									dispatchNewHabit({
										formField: formField as keyof Omit<NewHabit, "userId">,
										value: e.target.valueAsDate,
									})
								}
								type="date"
								className={c.Input}
								defaultValue={
									formField === "startDate" &&
									dayjs(newHabit.startDate).format("YYYY-MM-DD")
								}
							/>
						</div>

					))}
				</Section>
			</Row>

			<input
				type="submit"
				onClick={handleSubmitNewHabit}
				className={c.Button}
				value="Create habit"
			/>
		</Form>
	);
};

export default NewHabit;
