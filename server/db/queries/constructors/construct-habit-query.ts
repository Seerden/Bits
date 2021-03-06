import { QueryArgs } from "../../query-functions";

export const constructHabitsByUserQuery = (username: string): QueryArgs => ({
    text: `
        select h.* from habits h
        join users u
        on h.user_id = u.user_id
        and u.username = $1
    `,
    values: [username],
});

export const constructHabitsByHabitIdsQuery = (habitIds: string[]): QueryArgs => ({
    text: `
        select * from habits
        where habit_id = any($1)
    `,
    values: [habitIds],
});
