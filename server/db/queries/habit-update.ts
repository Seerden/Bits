import { Habit } from "../../shared/types/Habit";
import { makePooledQuery } from "../query-functions";

/**
 * Set a new value for habit[field] for the habit with the given habitId.
 * @param habitToUpdate expect this to at least contain habitId and whichever field
 * the user wishes to update, along with the desired new value,
 * like `{ name: "New habit name" }`
 */
export async function updateHabit(field: keyof Habit, habitToUpdate: Partial<Habit>) {
    let textFragment: string;
    const values = [];

    // set textFragment based on the field we want to update
    // this is another case where an ORM or pg-promise would come in handy
    switch (field) {
        case "habitName":
            textFragment = `set habit_name = $1`;
            values.push(habitToUpdate[field]);

        default:
            break;
    }

    values.push(habitToUpdate.habitId);

    return await makePooledQuery({
        text: `
            update habits
            ${textFragment}
            where habit_id = $2
            returning *
        `,
        values: values,
    });
}
