import { DateRange } from "@shared/types/Date";

type BaseHabitQuery = {
    dateRange: DateRange
};

interface QueryHabitsByUser extends BaseHabitQuery {
    username: string
};

interface QueryHabitsByIds extends BaseHabitQuery {
    habitIds: string[]
}

export type HabitQuery = QueryHabitsByUser | QueryHabitsByIds;