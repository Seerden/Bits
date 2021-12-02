import { Habit } from "@shared/types/Habit";
import { makePooledQuery } from "../query-functions";

/**
 * Delete the habit with the given `habitId` from the database.
 * Due to how the database tables are set up, this automatically removes
 * all habithistory entries related to the habitid
 */
export async function deleteHabitById(habitId: Habit["habitId"]) {
    return await makePooledQuery({
        text: `
            delete from habits where habit_id = $1 returning habit_id
        `,
        values: [habitId],
    });
}
