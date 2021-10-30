import { makePooledQuery } from "../dbQuery";

export async function getHabits(options) {
    const { rows } = await makePooledQuery({
        name: 'get all habits',
        text: 'select * from habits',
    });

    return rows;
}