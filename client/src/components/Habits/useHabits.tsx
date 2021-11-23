import { useFetchHabits } from "helpers/api/queryHabits";
import { asDates } from "helpers/time/asDates";
import { getDatesForLabels, listDatesBetween } from "helpers/time/dateList";
import { timescaleFormatters } from "helpers/time/format";
import { getCurrentTimestepStartOf } from "helpers/time/makeDate";
import { partitionDates, partitionsAsTimestamps } from "helpers/time/partitionDates";
import { getTimestepIndex, timesteps } from "helpers/time/timesteps";
import { useWindow } from "hooks/useWindow";
import { useCallback, useLayoutEffect, useMemo, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { habitIdsAtom } from "state/habits/habitFamily";
import { timescaleAtom } from "state/timescale";

/**
 * Determine amount (= "length") of date intervals to display,
 * depending on window width
 */
function getLength(width: number) {
    if (width > 1080) {
        return 6
    }
    return 3
}

export function useHabits() {
    const { width } = useWindow();
	const length = useMemo(() => {
        return getLength(width)
    }, [width])
	const { refetch } = useFetchHabits();
	const habitIds = useRecoilValue(habitIdsAtom);
	const [timestep, setTimestep] = useRecoilState(timescaleAtom);
	const timescaleFormatter = timescaleFormatters[timestep];

	// fetch habits when this hook first loads
	useLayoutEffect(() => {
		refetch();
	}, []);

	const [labels, partitionsAsTimes, labelDates] = useMemo(() => {
		const endOfRange = getCurrentTimestepStartOf(timestep).add(1, timestep);
		const labelDates = getDatesForLabels(timestep, length - 1);
		const labels = labelDates.map((date) => timescaleFormatter(date));
		const datesInRange = listDatesBetween(labelDates[0], endOfRange);
		const partitions = partitionDates(
			asDates(datesInRange),
			asDates(labelDates),
			timestep
		);
		const partitionsAsTimes = partitionsAsTimestamps(partitions as Date[][]);
		return [labels, partitionsAsTimes, labelDates];
	}, [timestep, length]);

    /**
     * Cycle through timesteps (Timestep[]) by going to either the next index, 
     * or to index 0. For reference, cycle goes from day > week > month > year
     */
	const cycleTimestep = useCallback(() => {
		const currentIndex = getTimestepIndex(timestep);
		const nextIndex = (currentIndex + 1) % timesteps.length;
		setTimestep(timesteps[nextIndex]);
	}, [timestep]);

	return {
		habitIds,
		timestep,
		setTimestep,
		labels,
		cycleTimestep,
		partitionsAsTimes,
		labelDates,
	} as const;
}
