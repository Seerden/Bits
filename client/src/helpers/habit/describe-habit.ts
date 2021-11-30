import { Habit } from "shared/types/Habit";

/**
 * Create a short string describing a habit's completion target
 * @see `./describe.habit.md`
 */
export function completionString(habit: Habit): string {
    const {
        completionType,
        completionFrequency,
        completionInterval,
        completionTimescale,
        unit,
    } = habit;

    const toggleSubstring = `${completionFrequency} time${
        completionFrequency > 1 ? "s" : ""
    } per ${completionTimescale}`;

    const rangeSubstring = `${completionInterval} ${unit}`;

    if (completionType === "toggle") {
        return toggleSubstring;
    } else {
        return `${rangeSubstring}, ${toggleSubstring}`;
    }
}
