import dayjs, { Dayjs } from "dayjs";
import { Timestep } from "types/time";

type TimescaleFormatter = {
    [t in Timestep]: (d: Dayjs) => string;
};

export const timescaleFormatters: TimescaleFormatter = {
    day: (d) => d.format("DD/MM"),
    week: (d) => `week ${d.week()}`,
    month: (d) => d.format("MMM"),
    year: (d) => d.format("YYYY"),
};
