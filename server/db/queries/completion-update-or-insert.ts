import { Completion } from "../../shared/types/Completion";
import { makePooledQuery } from "../query-functions";

/**
 * Execute a database query that either
 * 1. inserts a single new row into the habithistories table
 * 2. updates an existing row in the habithistories table
 *
 * and returns the entry that was either updated or added
 */
export async function insertOrUpdateCompletion({
    habitId,
    habitEntryDate,
    entryIndex,
    completed,
    rangeValue,
}: Partial<Completion>) {
    const rows = await makePooledQuery<Completion[]>({
        text: `
            insert into habithistories (habit_id, habit_entry_date, entry_index, completed, range_value)
            values ($1, $2, $3, $4, $5)
            on conflict on constraint unique_combination 
            do 
                update 
                set completed = $4,
                    range_value = $5
            returning *
        `,
        values: [habitId, habitEntryDate, entryIndex, completed, rangeValue],
    });
    return rows[0];
}
