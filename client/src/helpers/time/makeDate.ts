import dayjs from "dayjs";
import { Timestep } from "types/time";

/**
 * Returns the current date with precision set to start of timestep,
 *
 * Examples:
 * - 'day' -> returns date of midnight today,
 * - 'week' -> returns date of midnight of this week's sunday
 * - 'month' -> returns midnight of the first of the current month
 */
export function getCurrentTimestepStartOf(timestep: Timestep = "day") {
    return dayjs(new Date()).startOf(timestep);
}
