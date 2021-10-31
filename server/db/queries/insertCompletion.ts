import { makePooledQuery } from "../dbQuery";
import type { NewCompletion } from '@shared/types/Completion';

export async function insertCompletion(newCompletionEntry: NewCompletion) {
    const {
        habitId, 
        habitEntryDate,
        entryIndex,
    } = newCompletionEntry;

    let completed, rangeValue;

    if ("completed" in newCompletionEntry) {
        completed = newCompletionEntry.completed;
    } else {
        rangeValue = newCompletionEntry.rangeValue
    }

    const { rows } = await makePooledQuery({
        name: 'insert completion',
        text: `
            insert into habithistories (habit_id, habit_entry_date, entry_index, completed, range_value)
            values ($1, $2, $3, $4, $5)
            returning *
        `,
        values: [habitId, habitEntryDate, entryIndex, completed, rangeValue]
    });

    return rows;
};