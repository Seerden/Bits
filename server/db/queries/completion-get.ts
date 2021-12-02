import { makePooledQuery } from "../query-functions";

/**
 * Return all habithistories entries belonging to the given `habitId`.
 */
export async function getCompletionsByHabitId(habitId: string) {
    try {
        return await makePooledQuery({
            text: `
                select * from habithistories h
                where h.habit_id = $1
            `,
            values: [habitId],
        });
    } catch (error) {
        console.error(error);
    }
}
