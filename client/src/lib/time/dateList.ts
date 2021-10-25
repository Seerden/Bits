import dayjs from "dayjs";

/**
 * Returns a list of all dates in the inclusive specified range [start, end]
 */
export function listDatesBetween(start: dayjs.Dayjs, end: dayjs.Dayjs) {
    if (end.valueOf() < start.valueOf()) {
        throw('End date must be after start date')
    }

    if (start == end) {
        return [end]
    }

    try {
        const dateList: dayjs.Dayjs[] = [];
        let latest = start;
    
        while (latest <= end) {
            latest = latest.add(1, 'day');
            dateList.push(latest);
        }
    
        return dateList;
    } catch(e) {
        console.error('e')
    }
}

listDatesBetween(dayjs('2021-10-20'), dayjs(new Date()))