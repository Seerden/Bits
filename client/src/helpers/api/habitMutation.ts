import axios from 'axios';
import { useMutation } from 'react-query';
import { NewHabit } from "../../../../shared/types/Habit";

async function postNewHabit(newHabit: NewHabit) {
    return await axios.post('/api/db/habit', newHabit);
}

export function usePostNewHabit() {
    const response = useMutation('postNewHabit', postNewHabit);
    return response;
}