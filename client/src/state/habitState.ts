import { atom } from "recoil";
import { HabitWithCompletion } from "../../../shared/types/Habit";

/**
 * Piece of state that contains a list of `{ habitData, completionData }`.
 * Could also be called habitsWithCompletionAtom
 */
export const habitsAtom = atom<HabitWithCompletion[]>({
    key: "Habits",
    default: []
});