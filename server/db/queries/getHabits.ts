import { makePooledQueries, makePooledQuery, QueryArgs } from "../dbQuery";
import { HabitQuery } from "../../types/queryTypes";
import { 
    constructCompletionsByHabitIdsQuery, 
    constructCompletionsByUserQuery 
} from "./constructors/completions";
import { 
    constructAllHabitsQuery, 
    constructHabitsByHabitIdsQuery, 
    constructHabitsByUserQuery 
} from "./constructors/habits";

/**
 * Fetch all habits from the database.
 * @dev
 */
export async function getHabits(options?: any) {
    return await makePooledQuery(constructAllHabitsQuery());
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

/**
 * Fetch a list of habits by their `habitId`s and their completion entries in the given `dateRange`
 */
export async function getHabitsWithCompletion(args: HabitQuery) {
    const { dateRange } = args;

    let queries: QueryArgs[] = [];

    if ('username' in args) {
        queries = [
            constructHabitsByUserQuery(args.username),
            constructCompletionsByUserQuery(args.username, dateRange)
        ];
    } else {
        queries = [
            constructHabitsByHabitIdsQuery(args.habitIds),
            constructCompletionsByHabitIdsQuery(args.habitIds, dateRange)
        ]
    };

    return await makePooledQueries(queries);
};