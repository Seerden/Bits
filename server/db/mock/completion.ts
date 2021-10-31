import { makePooledQuery } from "../dbQuery";

const mockCompletion = {
    habitId: '795fb9b1-294e-4f1b-924d-19d7a677431d',
    habitEntryDate: new Date(),
    entryIndex: 0,
    completed: true,
    rangeValue: null,
}

export async function insertMockCompletion() {
    const {
        habitId,
        habitEntryDate,
        entryIndex,
        completed,
        rangeValue
    } = mockCompletion;

    makePooledQuery({
        name: 'insert completion entry',
        text: `insert into habithistories (habit_id, habit_entry_date, entry_index, completed, range_value) values ($1, $2, $3, $4, $5) returning *`,
        values: [
            habitId,
            habitEntryDate,
            entryIndex,
            completed,
            rangeValue
        ]
    })
}