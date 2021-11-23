import { atom, atomFamily, selectorFamily, useRecoilCallback } from "recoil";
import { Habit, HabitWithCompletion } from "../../../../shared/types/Habit";

/*
    Habits (as HabitWithCompletion[]) is obtained from the API. Most components only care about 
    a single habit, so we want to use an atomFamily instead of storing all habits as a list in 
    a single atom.

    The functionality in this file accomplishes the following:
    - implement a function to store a list of habitIds in an atom
    - create an atomFamily of habits, where each habit can be accessed by its habitId  (habitIds 
        are uuids, so we can assume these uniquely identify each habit)
    - create a function that populates the atomFamily with all habits in the list of habits 
            returned from the API
        - make sure to invoke this function whenever we receive new habits from the API. this 
        ensures that state is always up-to-date

    USAGE:
    - after receiving habits from the API, invoke setHabitsInFamily(habits)
    - to interact with an atom from habitFamily, use habitsState as follows:
        const [habit, setHabit] = useRecoilState(habitFamily(habitId))
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
const habitFamily = atomFamily<HabitWithCompletion, Habit["habitId"]>({
	key: "habitFamily",
	default: null,
});

export function useHabitsState() {
    /**
     * SETTER OPTION 1
	 * Recoil callback function that takes a list of habits and
	 * - (1) puts each habit's habitId in habitIdsAtom,
	 * - (2) creates a habitFamily atom for each habit
	 *
	 * @param habits HabitWithCompletion[] as received from the API.
	 */
	const setHabitsInFamily = useRecoilCallback(
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

	return { setHabitsInFamily };
}

/* SETTER OPTION 2: abstract away atomFamily atom get/set using a selectorFamily
    see https://stackoverflow.com/a/65216830/12820947

    PROBLEM: this can only set one atom at a time, but we get a whole list of habits from the API at once.
    We still need option 1 to put all habitIds into habitIdsAtom, and when we're doing that we might as well 
    just set each AtomFamily member.
*/

/**
 * selectorFamily abstraction to get and set an atom inside habitFamily
 * - get: returns the habitFamily member belonging to the given `habitId`
 * - set:
 *      - sets the habitFamily member with given `habitId` to `habit`
 *      - adds habitId
 */
export const habitsState = selectorFamily({
	key: "selectorFamily/habitsState",
	get:
		(habitId: Habit["habitId"]) =>
		({ get }) => {
			return get(habitFamily(habitId));
		},
	set:
		(habitId: Habit["habitId"]) =>
		({ set }, habit: HabitWithCompletion) => {
			set(habitFamily(habitId), habit);
			set(habitIdsAtom, (cur) => {
				/* only add habitId to habitIdsAtom if it's not already in there. we don't want to do something 
                    like Array.from(new Set([...cur, habitId])), because Sets don't have a consistent order, 
                    which would mean the state would change, which might have UI implications (e.g. suddenly 
                        habits might be displayed in different order)
                */
				return habitId in cur ? cur : [...cur, habitId];
			});
		},
});
