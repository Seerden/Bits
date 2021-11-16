import { atom, selector, selectorFamily } from "recoil";
import { Habit, HabitWithCompletion } from "../../../../shared/types/Habit";

/**
 * Piece of state that contains a list of `{ habitData, completionData }`.
 * Could also be called habitsWithCompletionAtom
 */
export const habitsAtom = atom<HabitWithCompletion[]>({
	key: "Habits",
	default: [],
});

/**
 * Selector that returns from habitsAtom only the habit with the specified habitId
 */
export const habitByIdState = selectorFamily({
	key: "HabitById",
	get: (habitId: Habit["habitId"]) => ({ get }) => {
        const habits = get(habitsAtom);
        return habits.filter(({ habitData }) => habitData.habitId === habitId);
    },
});
