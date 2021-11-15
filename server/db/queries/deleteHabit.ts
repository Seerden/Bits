import { Habit } from "@shared/types/Habit";
import { makePooledQuery } from "../dbQuery";

export async function deleteHabitById(habitId: Habit["habitId"]) {
    return await makePooledQuery({
        text: `
            delete from habits where habit_id = $1 returning habit_id
        `,
        values: [habitId]
    })
}