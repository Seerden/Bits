import { makePooledQuery } from "../query-functions";

export async function getUser(username: string) {
    return await makePooledQuery({
        name: "Fetch user by username",
        text: "select * from users where username = $1",
        values: [username],
    });
}
