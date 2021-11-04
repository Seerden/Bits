import { Completion } from "@shared/types/Completion";
import { makePooledQuery } from "../dbQuery";

export async function insertOrUpdateCompletion({
    habitId,
    habitEntryDate,
    entryIndex,
    completed,
    rangeValue
}: Partial<Completion>) {
    return await makePooledQuery({
        text: `
            insert into habithistories (habit_id, habit_entry_date, entry_index, completed, range_value)
            values ($1, $2, $3, $4, $5)
            on conflict on constraint unique_combination 
            do 
                update 
                set completed = $4,
                    range_value = $5
        `,
        values: [
            habitId,
            habitEntryDate,
            entryIndex,
            completed,
            rangeValue
        ]
    })
}