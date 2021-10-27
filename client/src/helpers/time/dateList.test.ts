import dayjs from "dayjs";
import { listDatesBetween } from "./dateList";

const now = dayjs(new Date());
const tomorrow = now.add(1, 'day');

describe('listDatesBetween', () => {
    test('returns empty list if start == end', () => {
        expect(
            listDatesBetween(now, now)
        ).toEqual([now])
    });

    test("returns array containing yesterday and today's dates if passed yesterday's and today's dates", () => {
        const res = listDatesBetween(now, tomorrow)
        // console.log(res);
        expect(
            res
        ).toHaveLength(2)
    })
})