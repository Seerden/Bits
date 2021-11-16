import { useFetchHabits } from "helpers/api/queryHabits";
import { asDates } from "helpers/time/asDates";
import { getDatesForLabels, listDatesBetween } from "helpers/time/dateList";
import { timescaleFormatters } from "helpers/time/format";
import { getCurrentTimestepStartOf } from "helpers/time/makeDate";
import { partitionDates, partitionsAsTimestamps } from "helpers/time/partitionDates";
import { getTimestepIndex, timesteps } from "helpers/time/timesteps";
import { useCallback, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import { timescaleAtom } from "state/timescale";

export function useHabits() {
	const [length] = useState<number>(6);
	const { data } = useFetchHabits();
	const [timestep, setTimestep] = useRecoilState(timescaleAtom);
	const timescaleFormatter = timescaleFormatters[timestep];

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

	const cycleTimestep = useCallback(() => {
		const currentIndex = getTimestepIndex(timestep);
		const nextIndex = (currentIndex + 1) % timesteps.length;
		setTimestep(timesteps[nextIndex]);
	}, [timestep]);

	return {
		data,
		timestep,
		setTimestep,
		labels,
		cycleTimestep,
		partitionsAsTimes,
		labelDates,
	} as const;
}
