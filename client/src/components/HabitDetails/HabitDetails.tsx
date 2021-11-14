import dayjs from "dayjs";
import { useFetchCompletionsById } from "helpers/api/queryCompletions";
import { useEffect } from "react";
import { Completion } from "../../../../shared/types/Completion";
import { Habit } from "../../../../shared/types/Habit";
import cs from "./HabitDetails.module.scss";

const HabitDetails = ({
	habitData,
	completionData,
}: {
	habitData: Habit;
	completionData: Completion[];
}) => {
	const { data, refetch } = useFetchCompletionsById(habitData.habitId);

	useEffect(() => {
		refetch();
	}, []);

	const trackingSince = dayjs(habitData.startDate || habitData.created).format(
		"MMM DD YYYY"
	);

	return (
		<div className={cs.HabitDetails}>
			{/* {[...Array(10).keys()].map((entry, index) => (
				<ProgressIcon key={index} percentage={Math.floor(Math.random() * 100)} />
			))} */}
			<section>
				<span>Tracking since {trackingSince}</span>
			</section>
		</div>
	);
};

export default HabitDetails;
