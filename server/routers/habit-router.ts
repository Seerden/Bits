import express from "express";
import { deleteHabitById } from "../db/queries/habit-delete";
import { getHabitsByUser, getHabitsWithCompletion } from "../db/queries/habit-get";
import { insertHabit } from "../db/queries/habit-insert";
import { updateHabit } from "../db/queries/habit-update";
import { isPermitted } from "../lib/middleware";
import { Completion } from "../shared/types/Completion";
import { DateRange } from "../shared/types/Date";
import { Habit, NewHabit } from "../shared/types/Habit";
import completionRouter from "./completion-router";

const habitRouter = express.Router({ mergeParams: true });

habitRouter.use("/completion", completionRouter);

habitRouter.get("/range/ids", isPermitted, async (req, res) => {
    const { from, to } = req.query as unknown as DateRange;
    const dateRange = { from, to };
    const { habitIds }: { habitIds: string[] } = req.query as any;
    const { username }: { username: string } = req.query as any;

    let habits: Habit[], completions: Completion[];

    if ("habitIds" in req.query) {
        [habits, completions] = await getHabitsWithCompletion({
            dateRange,
            habitIds,
        });
    } else {
        [habits, completions] = await getHabitsWithCompletion({
            dateRange,
            username,
        });
    }

    const response = habits.map((habit) => {
        const completionsForHabit = completions.filter(
            (completion) => completion.habitId === habit.habitId
        );

        return {
            habitData: habit,
            completionData: completionsForHabit,
        };
    });

    res.json(response);
});

habitRouter.get("/u/:username", isPermitted, async (req, res) => {
    try {
        const habits = await getHabitsByUser(req.params.username);
        res.send(habits);
    } catch (error) {
        res.status(401).send("Error fetching habits from database");
    }
});

habitRouter.post("/", isPermitted, async (req, res) => {
    let habit: NewHabit = req.body;
    let newHabit: any = habit;
    if (!newHabit.created) {
        newHabit.created = new Date();
    }

    try {
        const insertedHabit = await insertHabit(newHabit);
        res.send(insertedHabit);
    } catch (error) {
        console.error(error.stack);
        res.status(500).send({
            message: "Error inserting habit into database",
            error,
        });
    }
});

habitRouter.put("/", isPermitted, async (req, res) => {
    const habitToUpdate = req.body.habitToUpdate as Partial<Habit>;
    const field = req.body.field as keyof Habit;

    try {
        res.json(await updateHabit(field, habitToUpdate));
    } catch (error) {
        console.error;

        res.status(401).json({ message: JSON.stringify(error) });
    }
});

habitRouter.delete("/id", isPermitted, async (req, res) => {
    const habitId: string = req.body.habitId;

    try {
        const rows = await deleteHabitById(habitId);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting habit from database.", error });
    }
});

export default habitRouter;
