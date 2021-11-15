import { atom } from "recoil";
import { Habit } from "../../../shared/types/Habit";

export const habitsAtom = atom<Habit[]>({
    key: "Habits",
    default: []
})