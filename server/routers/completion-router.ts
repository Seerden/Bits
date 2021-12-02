import { NewCompletion } from "@shared/types/Completion";
import express from "express";
import { getCompletionsByHabitId } from "../db/queries/completion-get";
import { insertOrUpdateCompletion } from "../db/queries/completion-update-or-insert";
import { isPermitted } from "../lib/middleware";

const completionRouter = express.Router({ mergeParams: true });

completionRouter.put("/", isPermitted, async (req, res) => {
    const completionEntry: NewCompletion = req.body;
    const returnedCompletion = await insertOrUpdateCompletion(completionEntry);
    res.send(returnedCompletion);
});

completionRouter.get("/id", isPermitted, async (req, res) => {
    const { habitId } = req.query;
    try {
        res.json(await getCompletionsByHabitId(habitId as string));
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error fetching from API" });
    }
});
export default completionRouter;
