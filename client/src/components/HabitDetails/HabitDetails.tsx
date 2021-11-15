import dayjs from "dayjs";
import { useDeleteHabit } from "helpers/api/mutateHabits";
import { useFetchCompletionsById } from "helpers/api/queryCompletions";
import { getCompletionSuccessPercentage } from "helpers/completion/completionPercentage";
import { memo, useEffect, useMemo } from "react";
import { useRecoilValue } from "recoil";
import { timescaleAtom } from "state/timescale";
import { Completion } from "../../../../shared/types/Completion";
import { Habit } from "../../../../shared/types/Habit";
import cs from "./HabitDetails.module.scss";
import ProgressIcon from "./ProgressIcon";

function DeleteButton({ habitId }: { habitId: string }) {
	const { mutate, data } = useDeleteHabit(habitId);

	// useEffect(() => {
	// 	/*  on successful deletion, either
    //             1. update habitsState
    //             2. refetch habits
    //         to ensure the just-deleted habit is removed from view
    //     */
	// }, [data]);

	return <input type="button" value="Delete habit" onClick={(e) => mutate(habitId)} />;
}

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
					{typeof percentage === "number" && (
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
						Best streak: Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor eius
						enim ipsum at dignissimos et perspiciatis reiciendis earum expedita praesentium.
					</div>
				</section>
				<DeleteButton habitId={habitData.habitId} />
			</div>
		);
	}
);

export default HabitDetails;
