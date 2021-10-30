import { makePooledQuery } from "../dbQuery";

export async function getUsers() {
    const { rows } = await makePooledQuery({
        name: 'get all users',
        text: 'select * from users'
    });

    return rows;
}

export async function getUser(username: string) {
    const { rows } = await makePooledQuery({
        name: 'get user by username',
        text: 'select * from users where username = $1',
        values: [username]
    });

    return rows;
}