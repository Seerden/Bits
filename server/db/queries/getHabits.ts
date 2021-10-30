import { makePooledQuery } from "../dbQuery";

export async function getHabits(options?: any) {
    const { rows } = await makePooledQuery({
        name: 'get all habits',
        text: 'select * from habits',
    });

    return rows;
}

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