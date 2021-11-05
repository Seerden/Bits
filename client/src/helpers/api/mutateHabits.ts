import axios from 'axios';
import { useAuth } from 'hooks/useAuth';
import { useMutation } from 'react-query';
import { Habit, NewHabit } from "../../../../shared/types/Habit";

// POST HABIT
async function postNewHabit(newHabit: NewHabit, username: string) {
    return await axios.post('/api/db/habits', newHabit, { params: { username } });
};

export function usePostNewHabit() {
    const { username } = useAuth().currentUser

    const response = useMutation<any, any, NewHabit>('postNewHabit', (newHabit) => postNewHabit(newHabit, username));
    return response;
};

// PUT HABIT
type PutHabit = {
    field: keyof Habit,
    habitToUpdate: Partial<Habit>
};

async function putHabit({ field, habitToUpdate }: PutHabit, username: string) {
    return await axios.put('/api/db/habits', { field, habitToUpdate }, { params: { username } });
};

export function usePutHabit() {
    const { username } = useAuth().currentUser;

    const response = useMutation<any, any, PutHabit>('putHabit', (habit) => putHabit(habit, username));
    return response;
};