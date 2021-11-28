import express from "express";
import { getUsers } from "../db/queries/getUsers";
import { insertUser } from "../db/queries/insertUser";
import habitRouter from "./habitRouter";

const dbRouter = express.Router();

dbRouter.use("/habits", habitRouter);

dbRouter.get("/", (req, res) => {
    res.send("GET /db/ successful");
});

// Test query: select all users and return as json
dbRouter.get("/users", async (req, res) => {
    const rows = await getUsers();
    res.json(rows);
});

dbRouter.post("/user", async (req, res) => {
    const { username, password } = req.body;

    try {
        const insertedUser = await insertUser(username, password);
        res.send(insertedUser);
    } catch (e) {
        if (e instanceof Error) {
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
    }
});

export default dbRouter;
