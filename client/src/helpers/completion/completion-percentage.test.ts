import { Completion } from "../../../../shared/types/Completion";
import { Habit } from "../../../../shared/types/Habit";
import { isSuccessfulCompletion } from "./completion-percentage";

const completion = {
    completed: true,
    rangeValue: null,
} as Completion;

const habit = {
    completionType: "toggle",
    completionInterval: null,
} as unknown as Habit;

describe("isSuccessfulCompletion", () => {
    test("returns correct value for 'toggle' habit", () => {
        expect(isSuccessfulCompletion(completion, habit)).toBeTruthy();

        completion.completed = false;
        expect(isSuccessfulCompletion(completion, habit)).toBeFalsy();
    });

    test("returns correct value for 'interval' habit", () => {
        habit.completionType = "interval";
        completion.rangeValue = 100;
        habit.completionInterval = 90;
        expect(isSuccessfulCompletion(completion, habit)).toBeTruthy();

        completion.rangeValue = 100;
        habit.completionInterval = 110;
        expect(isSuccessfulCompletion(completion, habit)).toBeFalsy();
    });
});
