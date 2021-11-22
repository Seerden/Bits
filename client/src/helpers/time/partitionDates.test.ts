import dayjs from "dayjs";
import { dateToIdentifierMappings, isSameYear, partitionDates } from "./partitionDates";

const jan1 = dayjs('2021-01-01');
const lastJan1 = dayjs('2020-01-01');
const oct1 = dayjs('2021-10-01');

describe('isSameYear', () => {
    test('returns true if two dates in same year', () => {
        expect(isSameYear(jan1, oct1))
            .toBeTruthy();
    });

    test('returns false if two dates not in same year', () => {
        expect(isSameYear(jan1, lastJan1))
            .toBeFalsy();
    });
});

describe('truncateMap', () => {
    describe('truncateFn(day)', () => {
        test.each([
            [dateToIdentifierMappings['day'], jan1, '2021-1'],
            [dateToIdentifierMappings['week'], jan1, '2021-1'],
            [dateToIdentifierMappings['month'], jan1, '2021-0'],
            [dateToIdentifierMappings['year'], jan1, 2021]
        ])('%i %i', (truncateFn, date, expected) => {
            expect(truncateFn(date)).toBe(expected)
        });

    });
});


describe('partitionDates', () => {
    const dates = [...Array(5).keys()].map(entry => (dayjs(jan1).add(entry, 'year')).toDate());
    const sameDateArray = [...Array(5).keys()].map(entry => jan1.toDate());
    const years = [...Array(5).keys()].map(i => (dayjs(new Date()).year(2021+i)).toDate());

    test('partitions years correctly', () => {
        const result = partitionDates(dates, years, 'year');
        // console.log({ dates, years, result });
        expect(result).toHaveLength(5);

        for (let i = 0; i < 5; i++) {
            expect(result[i]).toHaveLength(1)
        };
    });

    test('has empty partition if no date matches partition range', () => {
        const result = partitionDates(sameDateArray, years, 'year');
        expect(result[0]).toHaveLength(5);
        expect(result[1]).toHaveLength(0);
    })
    
})