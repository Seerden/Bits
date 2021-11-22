/*
    Goal:
    In Habits.tsx, or CompactHabits.tsx, or a combination, we want to have access to 
    whether a user has reached their completion goal for each habit, for the interval
    being displayed. We want to display something with the following properties:
        - a style detail that highlights this fact
        - a string message like 
            "You've already hit your target of `3000 steps, 3 times per week` this week"!
             or "Hit your target (3000 steps) one more time this week for a successful week"
    To do this, we need to be able to map a habit to its completion state for the current date interval.
    Luckily, we already have access to this with `completionSuccessCountPerPartition`
*/

import { getDateIdentifier } from "helpers/time/truncate";
import { Completion } from "../../../../shared/types/Completion";
import { Habit } from "../../../../shared/types/Habit";
import { completionSuccessCountPerPartition } from "./completionPercentage";

/**
 * Given a habit, determine how many successful entries it still needs in order to hit its target
 * for the current date interval.
 *
 * Example:
 * - habit.completionTimescale == 'week',
 * - habit.completionFrequency = 3
 * - habit has 1 successful entry in the current week
 * - return 2, since habit needs 2 more successful entries this week to hit the completion target
 */
export function remainingCompletionsForSuccess(
	habitData: Habit,
	completionData: Completion[]
) {
    /*  use habitData.completionTimescale since we want to display habit-specific information. By 
        this we mean the following: even if the UI displays daily entries, we want to know how many 
        completion entries are still needed for the _habit_,
        and the _habit_ only cares about its own completionTimescale,
        not the timescale displayed by the UI  */
    const timescale = habitData.completionTimescale;


    const successCountPerPartition = completionSuccessCountPerPartition(
		completionData,
		habitData,
		timescale
	);

	const nowIdentifier = getDateIdentifier({
        date: new Date(),
        timestep: timescale
    })

    const successCountCurrentInterval = successCountPerPartition[nowIdentifier] || 0;
    return habitData.completionFrequency - successCountCurrentInterval;
}
