import dayjs from "dayjs";
import { DateOrDayjs, Timestep } from "types/time";
import { dateToIdentifierMappings } from "./partitionDates";

/**
 * Take the current date and get its timestep-dependent identifier.
 * 
 * Example:
 * - date: February 1, 2021
 * - timestep: "month"
 * - returns: "02-2021"
 *
 * @idea: rename "dateToIdentifierMappings" to "dateIdentifierMap"
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
