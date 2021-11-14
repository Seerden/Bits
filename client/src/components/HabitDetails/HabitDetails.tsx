import dayjs from "dayjs";
import { useFetchCompletionsById } from "helpers/api/queryCompletions";
import { getCompletionSuccessPercentage } from "helpers/completion/completionPercentage";
import { memo, useEffect, useMemo } from "react";
import { useRecoilValue } from "recoil";
import { timescaleAtom } from "state/timescale";
import { Completion } from "../../../../shared/types/Completion";
import { Habit } from "../../../../shared/types/Habit";
import cs from "./HabitDetails.module.scss";

const HabitDetails = memo(
	({ habitData, completionData }: { habitData: Habit; completionData: Completion[] }) => {
		const { data, refetch } = useFetchCompletionsById(habitData.habitId);
		const timescale = useRecoilValue(timescaleAtom);

		useEffect(() => {
			refetch();
		}, []);

		const percentage = useMemo(() => {
			if (!data) return;
			return getCompletionSuccessPercentage(data, habitData, timescale);
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
					<div>Tracking since {trackingSince}</div>
					{percentage && <div>{percentage}</div>}
				</section>
			</div>
		);
	}
);

export default HabitDetails;
