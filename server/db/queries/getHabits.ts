import { makePooledQueries, makePooledQuery, QueryArgs } from "../dbQuery";
import type { DateRange } from '@shared/types/Date';
import pg from 'pg';

/**
 * Fetch all habits from the database.
 * @dev
 */
export async function getHabits(options?: any) {
    const rows = await makePooledQuery({
        name: 'get all habits',
        text: 'select * from habits',
    });

    return rows;
};

/**
 * Fetch all habits belonging to the given `username`
 */
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

type BaseHabitQuery = {
    dateRange: DateRange
};

interface QueryHabitsByUser extends BaseHabitQuery {
    username: string
};

interface QueryHabitsByIds extends BaseHabitQuery {
    habitIds: string[]
}

export type HabitQuery = QueryHabitsByUser | QueryHabitsByIds;

const makeQueryHabitsByUser = (username: string): QueryArgs => ({
    text: `
        select * from habits h
        join users u
        on h.user_id = u.user_id
        and u.username = $1
    `,
    values: [username]
});

const makeQueryHabitsByHabitIds = (habitIds: string[]): QueryArgs => ({
    text: `
        select * from habits
        where habit_id = any($1)
    `,
    values: [habitIds]
});

const makeQueryCompletionsByUser = (username: string, { from, to }: DateRange): QueryArgs => ({
    text: `
        select * from habithistories hist
        join habits h
        on h.habit_id = hist.habit_id
        join users u
        on h.user_id = u.user_id
        where habit_entry_date between $1 and $2
        and u.username = $3
    `,
    values: [from, to, username]
});

const makeQueryCompletionsByHabitIds = (habitIds: string[], { from, to }: DateRange): QueryArgs => ({
    text: `
        select * from habithistories 
        where habit_entry_date between $1 and $2
        and habit_id = any($3)
    `,
    values: [from, to, habitIds]
});

/**
 * Fetch a list of habits by their `habitId`s and their completion entries in the given `dateRange`
 */
export async function getHabitsWithCompletion(args: HabitQuery) {
    const { dateRange } = args;

    let queries: QueryArgs[] = [];

    if ('username' in args) {
        queries = [
            makeQueryHabitsByUser(args.username),
            makeQueryCompletionsByUser(args.username, dateRange)
        ]
    } else {
        queries = [
            makeQueryHabitsByHabitIds(args.habitIds),
            makeQueryCompletionsByHabitIds(args.habitIds, dateRange)
        ]
    }

    const res = await makePooledQueries(queries);

    return res;
}