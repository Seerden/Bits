const testUserId = '436d2f05-edf9-4bb5-85a1-7a92061c17d1'

import { NewHabit } from "@shared/types/Habit";
import { insertHabit } from "../queries/insertHabit";

const mockHabit: NewHabit = {
    habitName: 'Run',
    description: null,
    completionType: 'toggle',
    completionInterval: null,
    userId: testUserId,
    completionTimescale: 'week',
    completionFrequency: 3
};

const timesteps: Timestep[] = ['day', 'week', 'month', 'year'];

type Timestep = 'day' | 'week' | 'month' | 'year'

function randomTimestep(): Timestep{
    return timesteps[Math.floor(Math.random()*4)];
}

function randomFrequency(max: number) {
    return Math.floor(Math.random()*max)+1
}

export const mockToggleHabits = [...Array(9).keys()].map((entry, index) => ({
    ...mockHabit, 
    habitName: String(index),
    completionFrequency: randomFrequency(5), 
    completionTimescale: randomTimestep(),
}))

export const mockRangeHabits: NewHabit[] = [...Array(9).keys()].map((entry, index) => ({
    ...mockHabit, 
    habitName: String(index),
    completionType: 'interval',
    completionInterval: randomFrequency(20), 
    completionTimescale: randomTimestep(),
}))

async function insertMockHabits() {
    const responses = [];
    for (const habit of mockRangeHabits) {
        const response = await insertHabit(habit);
        responses.push(response);
    }

    return responses;
}