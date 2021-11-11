import { Dayjs } from "dayjs";
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
	const timestep = useRecoilValue(timescaleAtom);
	const completionSuccess = getCompletionSuccess(
		habitData.completionType,
		habitData.completionInterval,
		completionData
	);

	useEffect(() => {
		const successPerPartition = getCompletionSuccessPerPartition(
			completionSuccess,
			timestep,
			labelDates
		);

		console.log(successPerPartition);
	}, [timestep]);

	return (
		<div className={cs.HabitDetails}>
			{[...Array(10).keys()].map((entry, index) => (
				<ProgressIcon
					key={index}
					percentage={Math.floor(Math.random() * 100)}
				/>
			))}
		</div>
	);
};

export default HabitDetails;
