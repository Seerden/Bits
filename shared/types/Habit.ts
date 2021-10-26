export type NewHabitHistory = {
    habitEntryDate: Date,
    entryIndex: number,
    completed?: boolean,
    rangeValue?: number
}

export interface HabitHistory extends NewHabitHistory {
    completion_id: number,
    habit_id: string,
};

export type NewHabit = {
    userId: string,
    name: string,
    description?: string,
    completionType: 'interval' | 'toggle',
    completionTimescale: 'day' | 'week' | 'month' | 'year',
    completionFrequency: number,
    completionInterval: number,
    startDate?: Date,
    endDate?: Date
    
};

export interface Habit extends NewHabit {
    habitId: string,
};