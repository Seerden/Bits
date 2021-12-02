import { makePooledQuery } from "../query-functions";

/**
 * Find users from the database by username.
 * Since user's usernames are unique, returns an array of length <= 1
 */
export async function getUser(username: string) {
    return await makePooledQuery({
        name: "Fetch user by username",
        text: "select * from users where username = $1",
        values: [username],
    });
}
