import dayjs, { Dayjs } from "dayjs";
import { DateOrDayjs, Timestep } from "types/time";

type DateIdentifiers = {
    [K in Timestep]: (d: Dayjs) => number | string;
};

export const dateToIdentifierMappings: DateIdentifiers = {
    day: (d) => `${d.year()}-${d.dayOfYear()}`,
    week: (d) => `${d.year()}-${d.week()}`,
    month: (d) => `${d.year()}-${d.month()}`,
    year: (d) => d.year(),
};

/**
 * Map a date to a timestep-dependent identifier.
 *
 * Example:
 * - date: February 1, 2021
 * - timestep: "month"
 * - returns: "02-2021"
 */
export function getDateIdentifier({
    date,
    timestep,
}: {
    date: DateOrDayjs;
    timestep: Timestep;
}) {
    const dateIdentityFn = dateToIdentifierMappings[timestep];
    return dateIdentityFn(dayjs(date));
}
