import { Completion } from "shared/types/Completion";
import { indexMatches } from "./completion-entries";

const partialCompletion = {
    entryIndex: 1,
} as Completion;

describe("indexMatches", () => {
    test("", () => {
        expect(indexMatches(partialCompletion, 1)).toBeTruthy();
        expect(indexMatches(partialCompletion, 0)).toBeFalsy();
    });
});
