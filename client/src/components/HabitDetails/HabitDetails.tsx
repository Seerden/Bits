import dayjs from "dayjs";
import { useFetchCompletionsById } from "helpers/api/queryCompletions";
import { getCompletionSuccessPercentage } from "helpers/completion/completionPercentage";
import { useClickOutside } from "hooks/useClickOutside";
import { memo, useLayoutEffect, useMemo, useRef } from "react";
import { useRecoilValue } from "recoil";
import { timescaleAtom } from "state/timescale";
import { Completion } from "../../../../shared/types/Completion";
import { Habit } from "../../../../shared/types/Habit";
import DeleteButton from "./DeleteButton/DeleteButton";
import cs from "./HabitDetails.module.scss";
import ProgressIcon from "./ProgressIcon";

type HabitDetailsProps = {
	habitData: Habit;
	completionData: Completion[];
	toggleDetails: () => void;
};

const HabitDetails = memo(({ habitData, toggleDetails }: HabitDetailsProps) => {
	/* fetch all existing completion entries for this habit. 
        currently, we only use the completion entries to compute successPercentage,
        but we might want to do more with the entries later on, so instead of calling an 
        API endpoint that just returns a percentage, let's keep all the data here for now, 
        until (if ever) we find that we don't need anything other than successPercentage
    */
	const { data, refetch } = useFetchCompletionsById(habitData.habitId);
	const timescale = useRecoilValue(timescaleAtom);

	/* create ref and clickOutside function, and pass to useClickOutside 
        to turn this component into a proper modal */
	const modalRef = useRef(null);
	function handleClickOutside() {
		toggleDetails();
	}
	useClickOutside(modalRef, handleClickOutside, ["Escape"]);

	useLayoutEffect(() => {
		refetch();
	}, []);

	const percentage = useMemo(() => {
		if (!data) return;
		return getCompletionSuccessPercentage(data, habitData, timescale);
	}, [data]);

	const trackingSince = dayjs(habitData.startDate || habitData.created).format(
		"MMMM DD[,] YYYY"
	);

	return (
		/* The wrapper class adds a full-screen slightly transparent background to
            highlight that the modal is, well, a modal
        */
		<div className={cs.Wrapper}>
			<div ref={modalRef} className={cs.HabitDetails}>
				<Header>
					Details for habit <span className={cs.Name}>{habitData.habitName}</span>
				</Header>

				<input
					onClick={() => toggleDetails()}
					className={cs.Close}
					type="button"
					value="Hide details"
				/>

				<ul>
					{/* DESCRIPTION */}
					{habitData.description.length > 0 && (
						<Datum label="Description">{habitData.description}</Datum>
					)}

					{/* TRACKING SINCE */}
					<Datum label="Age">Tracking since {trackingSince}</Datum>

					{/* HABIT COMPLETION SETTINGS */}
					<Datum label="Target">
						{/* @todo -- PLACEHOLDER */}
						You aim to complete this habit X times per Y interval.
					</Datum>

					{/* PROGRESS */}
					{!isNaN(percentage) && (
						<Datum label="Progress">
							<div
								style={{
									display: "grid",
									gridTemplateColumns: "max-content 1fr",
									alignItems: "center",
									gridGap: "0.5rem",
								}}
							>
								<ProgressIcon size={45} percentage={percentage} /> of{" "}
								{habitData.completionTimescale}s successful since tracking started
							</div>
						</Datum>
					)}

					{/* CURRENT STREAK */}
					<Datum label="Current">Current streak:</Datum>

					{/* BEST STREAK */}
					<Datum label="Best">Best streak:</Datum>
				</ul>
				<DeleteButton habitId={habitData.habitId} />
			</div>
		</div>
	);
});

export default HabitDetails;

function DatumLabel({ children }) {
	return <span className={cs.Label}>{children}</span>;
}

function Datum({ children, label }) {
	return (
		<li className={cs.Field}>
			<DatumLabel>{label}</DatumLabel>
			{children}
		</li>
	);
}

function Header({ children }) {
	return <header className={cs.Header}>{children}</header>;
}
