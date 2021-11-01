import axios from 'axios';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import type { DateRange } from '../../../../shared/types/Date';

async function fetchHabitsInRange(dateRange: DateRange) {
    const { data } = await axios.get('/api/db/habits/range', { params: dateRange });
    return data;
}

const defaultDateRange = {
    from: dayjs(new Date()).add(-7, 'day').toDate(),
    to: new Date(),
};

export function useFetchHabits() {
    const [dateRange, setDateRange] = useState<DateRange>(defaultDateRange);
    const { data, refetch } = useQuery(['fetchHabits', dateRange], () => fetchHabitsInRange(dateRange), { enabled: false, retry: false });

    useEffect(() => {  // @todo: move this to useHabits?
        refetch();
    }, [dateRange, refetch]);


    return { data, setDateRange } as const;
}