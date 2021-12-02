import express from "express";
import { insertUser } from "../db/queries/user-insert";
import habitRouter from "./habit-router";

const dbRouter = express.Router();
dbRouter.use("/habits", habitRouter);

dbRouter.post("/user", async (req, res) => {
    const { username, password } = req.body;

    try {
        const insertedUser = await insertUser(username, password);
        res.send(insertedUser);
    } catch (e) {
        /* "users_user_name_key" is a postgres response associated with unique username requirement
            make sure that, if we ever change the database table, we revisit the naming of this error
            otherwise this response case won't be triggered  */
        if (e.message.includes("users_user_name_key")) {
            res.status(403).send({
                success: false,
                message: "Username already exists",
            });
        } else {
            res.status(401).send({
                success: false,
                message:
                    "Error inserting user into database. Perhaps the username already exists.",
            });
        }
    }
});

export default dbRouter;
