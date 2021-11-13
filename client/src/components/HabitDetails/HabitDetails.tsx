import dayjs, { Dayjs } from "dayjs";
import { useFetchCompletionsById } from "helpers/api/queryCompletions";
import {
	getCompletionSuccess,
	getCompletionSuccessPerPartition,
} from "helpers/completion/completionPercentage";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { timescaleAtom } from "state/timescale";
import { Completion } from "../../../../shared/types/Completion";
import { Habit } from "../../../../shared/types/Habit";
import cs from "./HabitDetails.module.scss";
import ProgressIcon from "./ProgressIcon";

const HabitDetails = ({
	habitData,
	completionData,
	labelDates,
}: {
	habitData: Habit;
	completionData: Completion[];
	labelDates: Dayjs[];
}) => {
	// const timestep = useRecoilValue(timescaleAtom);
	// const completionSuccess = getCompletionSuccess(
	// 	habitData.completionType,
	// 	habitData.completionInterval,
	// 	completionData
	// );
	const { data, refetch } = useFetchCompletionsById(habitData.habitId);

	useEffect(() => {
		refetch();
	}, []);

	useEffect(() => {
		console.log(data);
	}, [data]);

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
