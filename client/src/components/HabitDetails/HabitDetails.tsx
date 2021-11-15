import dayjs from "dayjs";
import { useFetchCompletionsById } from "helpers/api/queryCompletions";
import { getCompletionSuccessPercentage } from "helpers/completion/completionPercentage";
import { memo, useEffect, useMemo } from "react";
import { useRecoilValue } from "recoil";
import { timescaleAtom } from "state/timescale";
import { Completion } from "../../../../shared/types/Completion";
import { Habit } from "../../../../shared/types/Habit";
import cs from "./HabitDetails.module.scss";
import ProgressIcon from "./ProgressIcon";

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
				<section>
					<div className={cs.Field}>
						<span className={cs.Label}>Age</span>
						Tracking since {trackingSince}
					</div>
					{typeof percentage === 'number' && (
						<div className={cs.Field}>
							<span className={cs.Label}>Success</span>
							You've been successful for <ProgressIcon
								size={50}
								percentage={percentage}
							/> of {habitData.completionTimescale}s.
						</div>
					)}
					<div className={cs.Field}>
						<span className={cs.Label}>Current</span> Current streak:{" "}
					</div>
					<div className={cs.Field}>
						<span className={cs.Label}>Best</span>
						Best streak: Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor eius enim ipsum at dignissimos et perspiciatis reiciendis earum expedita praesentium.
					</div>
				</section>
			</div>
		);
	}
);

export default HabitDetails;
