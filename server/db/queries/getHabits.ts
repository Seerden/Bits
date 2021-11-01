import { makePooledQueries, makePooledQuery } from "../dbQuery";
import type { DateRange } from '@shared/types/Date';

export async function getHabits(options?: any) {
    const rows = await makePooledQuery({
        name: 'get all habits',
        text: 'select * from habits',
    });

    return rows;
};

// export async function getHabitsInRange(dateRange: DateRange, habitIds?: string[]) {
//     const { from, to } = dateRange;

//     try {
//         const { rows } = await makePooledQuery({
//             name: 'get habits from user in date range',
//             text: `
//                 select * from habithistories c
//                 right join habits h
//                 on c.habit_id = h.habit_id
//                 and c.habit_entry_date between $1 and $2
//                 ${habitIds ? 'and h.habit_id = any($3)': ''}
//             `,
//             values: habitIds ? [from, to, habitIds] : [from, to]
//         });
//         return rows;
//     } catch (error) {
//         console.error(error)        
//     }
// };

export async function getHabitsByUser(username: string) {
    try {
        const rows = await makePooledQuery({
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
};

export async function getHabitsWithCompletion(dateRange: DateRange, habitIds: string[]) {
    const { from, to } = dateRange;

    const res = await makePooledQueries([
        {
            name: 'fetch habits',
            text: `
                select *, habit_id from habits
                where habit_id = any($1)
            `,
            values: [habitIds]
        },
        {
            name: 'fetch completion',
            text: `
                select * from habithistories 
                where habit_entry_date between $1 and $2
                and habit_id = any($3)
            `,
            values: [from, to, habitIds]
        }
    ]);

    return res;
}