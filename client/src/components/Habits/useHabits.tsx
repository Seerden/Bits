import dayjs from "dayjs";
import { useFetchHabits } from "helpers/api/queryHabits";
import { asDates } from "helpers/time/asDates";
import {
	getDatesForLabels,
	getTimestepIndex,
	listDatesBetween,
	timesteps,
} from "helpers/time/dateList";
import { timescaleFormatters } from "helpers/time/format";
import { partitionDates } from "helpers/time/partitionDates";
import { useCallback, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import { timescaleAtom } from "state/timescale";

export function useHabits() {
	const [length, setLength] = useState<number>(6);
	const { data, setDateRange } = useFetchHabits();
	const [timestep, setTimestep] = useRecoilState(timescaleAtom);
	const formatter = timescaleFormatters[timestep];

	const [labels, partitions] = useMemo(() => {
		const endOfRange = dayjs(new Date()).startOf(timestep).add(1, timestep);
		const labelDates = getDatesForLabels(timestep, length - 1);
		const labels = labelDates.map((date) => formatter(date));
		const datesInRange = listDatesBetween(labelDates[0], endOfRange);
		const partitions = partitionDates(
			asDates(datesInRange),
			asDates(labelDates),
			timestep
		);

		return [labels, partitions];
	}, [timestep, length]);

	const cycleTimestep = useCallback(() => {
		const currentIndex = getTimestepIndex(timestep);
		setTimestep(timesteps[(currentIndex + 1) % timesteps.length]);
	}, [timestep]);

	return {
		data,
		timestep,
		setTimestep,
		labels,
		cycleTimestep,
		partitions,
	} as const;
}
