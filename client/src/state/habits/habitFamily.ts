import { atom, atomFamily, useRecoilCallback } from "recoil";
import { Habit, HabitWithCompletion } from "../../../../shared/types/Habit";

/*
    Habits (as HabitWithCompletion[]) is obtained from the API.
    Most components only care about a single habit, so we want to use an atomFamily
    instead of storing all habits as a list in a single atom

    - store a list of habitIds in an atom
    - create an atomFamily of habits, where each habit can be accessed by its habitId 
        (habitIds are uuids, so we can assume these uniquely identify each habit)
    - create a function that populates the atomFamily with all habits in the list of habits 
        returned from the API
        - make sure to invoke this function whenever we receive new habits from the API to ensure state is always up-to-date
*/

/**
 * Atom that stores a list of habitIds
 */
export const habitIdsAtom = atom({
	key: "habitIds",
	default: [] as Array<Habit["habitId"]>,
});

/**
 * AtomFamily that stores HabitWithCompletion entries using their habitData.habitId as keys
 */
export const habitFamily = atomFamily<HabitWithCompletion, Habit["habitId"]>({
	key: "habitFamily",
	default: null,
});

/**
 * Recoil callback function that takes a list of habits and 
 * - (1) puts all habitIds in habitIdsAtom, 
 * - (2) creates a habitFamily atom for each habit
 * 
 * @param habits: HabitWithCompletion[] as received from the API.
 */
export const setHabitsInFamily = useRecoilCallback(
	({ set }) =>
		(habits: HabitWithCompletion[]) => {
			const habitIds = habits.map(({ habitData }) => habitData.habitId);
			set(habitIdsAtom, habitIds);

			for (const { habitData, completionData } of habits) {
				set(habitFamily(habitData.habitId), { habitData, completionData });
			}
		},
	[]
);
