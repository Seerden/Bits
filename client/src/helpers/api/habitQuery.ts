import axios from 'axios';
import dayjs from 'dayjs';
import { useAuth } from 'hooks/useAuth';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import type { DateRange } from '../../../../shared/types/Date';
import { HabitResponse } from '../../../../shared/types/Habit';

async function fetchHabitsInRange(dateRange: DateRange, habitIds?: string[], username?: string) {
    const { data } = await axios.get('/api/db/habits/range/ids', {
        params: {
            ...dateRange,
            habitIds,
            username
        }
    });
    return data as HabitResponse[];
};

const today = dayjs(new Date()).startOf('day')
const defaultDateRange = {
    from: today.add(-7, 'day').toDate(),
    to: today.endOf('day').toDate(),  
    // @todo: make sure that wherever we use setDateRange, 
    // we make sure the 'to', i.e. the end of the range, is set with .endOf('day"), 
    // otherwise we won't get all the values from the database
};

export function useFetchHabits() {
    const [dateRange, setDateRange] = useState<DateRange>(defaultDateRange);
    const { username } = useAuth().currentUser;
    const { data, refetch } = useQuery(['fetchHabits', dateRange, username], () =>
        // @todo: the 'null' in the next line refers to the habitIds to fetch
        // include a piece of state for habitIds once we find a usecase for fetching only a subset of a user's habits
        fetchHabitsInRange(dateRange, null, username), { enabled: false, retry: false }
    );

    useEffect(() => {  // @todo: move this to useHabits?
        refetch();
    }, [dateRange, refetch]);


    return { data, setDateRange } as const;
}