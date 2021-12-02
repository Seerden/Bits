import { DateRange } from "@shared/types/Date";
import { QueryArgs } from "../../query-functions";

export const constructCompletionsByUserQuery = (
    username: string,
    { from, to }: DateRange
): QueryArgs => ({
    text: `
        select hist.* from habithistories hist
        join habits h
            on h.habit_id = hist.habit_id
        join users u
            on h.user_id = u.user_id
        where habit_entry_date::date between $1 and $2
            and u.username = $3
    `,
    values: [from, to, username],
});

export const constructCompletionsByHabitIdsQuery = (
    habitIds: string[],
    { from, to }: DateRange
): QueryArgs => ({
    text: `
        select * from habithistories 
        where habit_entry_date between $1 and $2
        and habit_id = any($3)
    `,
    values: [from, to, habitIds],
});
