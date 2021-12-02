import { hash } from "bcrypt";
import { makePooledQuery } from "../query-functions";

export async function insertUser(username: string, password: string) {
    const hashedPassword = await hash(password, 10);

    // @todo: implement trycatch -- won't have rows if user already exists or another error occurs
    const rows = await makePooledQuery({
        text: "insert into users (username, password) values ($1, $2) returning user_id, username",
        values: [username, hashedPassword],
    });

    return rows[0];
}
