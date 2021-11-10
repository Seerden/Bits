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
}: {
	habitData: Habit;
	completionData: Completion[];
}) => {
	// const timestep = useRecoilValue(timescaleAtom);

	// useEffect(() => {
	// 	getCompletionSuccessPerPartition(
	// 		getCompletionSuccess(
	// 			habitData.completionType,
	// 			habitData.completionInterval,
	// 			completionData
	// 		),
	// 		timestep
	// 	);
	// }, [timestep]);

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
