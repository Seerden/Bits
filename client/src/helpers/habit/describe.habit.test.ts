import { Habit } from "shared/types/Habit";
import { completionString } from "./describe.habit";

describe("completionString", () => {
    test("return correct string for daily toggle habit", () => {
        const habit: Partial<Habit> = {
            completionFrequency: 1,
            completionTimescale: "day",
            completionType: "toggle",
        };
        expect(completionString(habit as Habit)).toEqual("1 time per day");
    });
    test("return correct string for daily interval habit", () => {
        const habit: Partial<Habit> = {
            completionFrequency: 2,
            completionTimescale: "day",
            completionType: "interval",
            completionInterval: 8,
            unit: "hours",
        };
        expect(completionString(habit as Habit)).toEqual("8 hours, 2 times per day");
    });
});
