import { makePooledQuery } from "../dbQuery";
import type { DateRange } from '@shared/types/Date';

export async function getHabits(options?: any) {
    const { rows } = await makePooledQuery({
        name: 'get all habits',
        text: 'select * from habits',
    });

    return rows;
};

export async function getHabitsInRange (dateRange: DateRange) {
    const { from, to } = dateRange;

    try {
        const { rows } = await makePooledQuery({
            name: 'get habits from user in date range',
            text: `
                select * from habits h
                inner join habithistories c
                on c.habit_id = h.habit_id
                and c.habit_entry_date between $1 and $2
            `,
            values: [from, to]
        });
        return rows;
    } catch (error) {
        console.error(error)        
    }
};

export async function getHabitsByUser(username: string) {
    try {
        const { rows } = await makePooledQuery({
            name: 'getHabitsByUser',
            text: `
                select h.* from habits h
                left join users u
                on h.user_id = u.user_id
                and u.username = $1
            `,
            values: [username]
        });
        return rows;
    } catch (error) {
        throw new Error(error);
    }
}