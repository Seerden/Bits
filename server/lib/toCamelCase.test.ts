import { snakeToCamelCase, withCamelCaseKeys } from "./toCamelCase";

describe('snakeToCamelCase', () => {
    test('turns snake_case string to camelCase string', () => {
        expect(snakeToCamelCase('habit_id')).toEqual('habitId')
    });

    test("returns original string if it doesn't contain any underscores", () => {
        expect(snakeToCamelCase('username')).toEqual('username')
    })
});

describe('withCamelCaseKeys', () => {
    test("converts an object's snake_case keys to camelCase", () => {
        const testObj = [{
            habit_id: 'testId'
        }]
        const result = withCamelCaseKeys(testObj);

        expect(result[0]).toHaveProperty('habitId');
    });
});