import { Completion } from "./Completion";

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
    habitName: string,
    description?: string,
    completionType: 'interval' | 'toggle',
    completionTimescale: 'day' | 'week' | 'month' | 'year',
    completionFrequency: number,
    completionInterval: number,
    startDate?: Date,
    endDate?: Date,
    unit?: string
};

export interface Habit extends NewHabit {
    created: Date | string,
    habitId: string,
};

export type HabitWithCompletion = { 
    habitData: Habit,
    completionData: Completion[]
}