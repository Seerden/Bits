import dayjs from "dayjs";
import { asDates, asTimes } from "./asDates";

const nowDayjs = dayjs(new Date());

const dayjsDates = [nowDayjs, nowDayjs.add(1, 'day')]

describe('asDates', () => {
    test('converts Dayjs objects to dates', () => {
        const result = asDates(dayjsDates);
        expect(result[0]).toHaveProperty('getTime');
        expect(result).toHaveLength(dayjsDates.length);
    });
});

describe('asTimes', () => {
    const cases = [
        [dayjsDates],
        [asDates(dayjsDates)]
    ] as Date[][][]

    test.each(cases)('converts Dayjs[] or Date[] to times', (dates) => {
        const result = asTimes(dates);
        expect(result)
            .toEqual(
                expect.arrayContaining([expect.any(Number)])
            );
        expect(result)
            .toHaveLength(dates.length);
    });
});