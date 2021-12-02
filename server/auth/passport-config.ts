import { Strategy } from "passport-local";
import { getUser } from "../db/queries/user-get";
import { compare } from "bcrypt";

export const strategy = new Strategy(
    {
        usernameField: "username",
        passwordField: "password",
    },
    async (username, password, done) => {
        try {
            const [user] = await getUser(username);
            if (!user?.password) {
                return done(null, false, { message: "Invalid credentials" });
            }
            const match = await compare(password, user.password);
            return match
                ? done(null, user)
                : done(null, false, { message: "Invalid credentials" });
        } catch (e) {
            return done(e);
        }
    }
);
