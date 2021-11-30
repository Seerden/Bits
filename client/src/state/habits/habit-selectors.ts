import { remainingCompletionsForSuccess } from "helpers/completion/completionMessage";
import { atom, selector } from "recoil";
import { habitIdsAtom, habitsState } from "./habitFamily";

export enum HabitFilterOptions {
    ALL = "all",
    COMPLETE = "finished",
    INCOMPLETE = "incomplete",
}

export const habitFilterValueAtom = atom({
    key: "atom/habit-filter",
    default: HabitFilterOptions.ALL,
});

/**
 * Return an array only containing the habits that are currently successful
 */
export const habitIdsForDisplaySelector = selector({
    key: "selector/successful-habits",
    get: ({ get }) => {
        const habitIds = get(habitIdsAtom);
        const filterValue = get(habitFilterValueAtom);
        const allHabits = habitIds.map((id) => get(habitsState(id)));

        // @todo: consider turning this into switch-case
        if (filterValue === "all") {
            return habitIds;
        }

        if (filterValue === "finished") {
            /* this case and the next one use the same logic, except we flip the sign
                    when comparing remainingCompletions to 0
                    @todo: turn this into a function, so we can test it
                    let the function that an option (greater/lesser) that decides
                    whether we want complete or incomplete habits
                */
            return allHabits
                .filter(
                    ({ habitData, completionData }) =>
                        remainingCompletionsForSuccess(habitData, completionData) <= 0
                )
                .map(({ habitData }) => habitData.habitId);
        }

        if (filterValue === "incomplete") {
            return allHabits
                .filter(
                    ({ habitData, completionData }) =>
                        remainingCompletionsForSuccess(habitData, completionData) > 0
                )
                .map(({ habitData }) => habitData.habitId);
        }
    },
});
