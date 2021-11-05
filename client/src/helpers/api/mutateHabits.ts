import axios from 'axios';
import { useMutation } from 'react-query';
import { Habit, NewHabit } from "../../../../shared/types/Habit";

// POST HABIT
async function postNewHabit(newHabit: NewHabit) {
    return await axios.post('/api/db/habits', newHabit);
};

export function usePostNewHabit() {
    const response = useMutation('postNewHabit', postNewHabit);
    return response;
};

// PUT HABIT
type PutHabit = {
    field: keyof Habit,
    habitToUpdate: Partial<Habit>
};

async function putHabit({ field, habitToUpdate }: PutHabit) {
    return await axios.put('/api/db/habits', { field, habitToUpdate });
};

export function usePutHabit() {
    const response = useMutation('putHabit', putHabit);
    return response;
};