import { makePooledQuery } from "../dbQuery";
import type { NewHabit } from '@shared/types/Habit';

/**
 * Insert a new Habit into the database
 */
export async function insertHabit(newHabit: NewHabit) {
    // @todo: figure out a way to programmaticaly extract newHabit properties into an array, 
    // instead of copy-pasting the object destructuring into the the values array
    // or just use the pg-promise library, or switch to an ORM...
    const { 
        userId,
        habitName, 
        description, 
        completionType,
        completionTimescale, 
        completionFrequency,
        completionInterval,
        startDate,
        endDate
    } = newHabit;

    try {
        const result = await makePooledQuery({
            text:
                `insert into habits (user_id, habit_name, description, completion_type, completion_timescale, completion_frequency, completion_interval, start_date, end_date) values($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *`,
            values: [
                userId,
                habitName, 
                description, 
                completionType,
                completionTimescale, 
                completionFrequency,
                completionInterval,
                startDate,
                endDate]
        })
        
        return result.rows[0]
        
    } catch (error) {
        throw new Error(error);
    }
}