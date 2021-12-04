import type { NewHabit } from "../../shared/types/Habit";
import { makePooledQuery } from "../query-functions";

/**
 * Insert a new Habit into the database
 */
export async function insertHabit(newHabit: NewHabit & { created: Date }) {
    /*  @todo: figure out a way to programmaticaly extract newHabit properties into an array,
        instead of object destructuring and pasting each field into the values array.
        Maybe use the pg-promise library, or switch to an ORM...  */
    const {
        userId,
        habitName,
        description,
        completionType,
        completionTimescale,
        completionFrequency,
        completionInterval,
        startDate,
        endDate,
        created,
        unit,
    } = newHabit;

    try {
        const rows = await makePooledQuery({
            text: `insert into habits 
                (
                    user_id, habit_name, description, completion_type, 
                    completion_timescale, completion_frequency, 
                    completion_interval, start_date, end_date, created, 
                    unit
                ) 
                values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) returning *`,
            values: [
                userId,
                habitName,
                description,
                completionType,
                completionTimescale,
                completionFrequency,
                completionInterval,
                startDate,
                endDate,
                created,
                unit,
            ],
        });

        return rows[0];
    } catch (error) {
        throw new Error(error);
    }
}
