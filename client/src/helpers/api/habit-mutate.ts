import axios from "axios";
import { useAuth } from "hooks/useAuth";
import { useAuthUrl } from "hooks/useAuthUrl";
import { useMutation } from "react-query";
import { Habit, NewHabit } from "shared/types/Habit";

// POST HABIT
async function postNewHabit(newHabit: NewHabit, username: string) {
    return await axios.post("/api/db/habits", newHabit, { params: { username } });
}

export function usePostNewHabit() {
    const { username } = useAuth().currentUser;

    const response = useMutation<any, any, NewHabit>("postNewHabit", (newHabit) =>
        postNewHabit(newHabit, username)
    );
    return response;
}

// PUT HABIT
type PutHabit = {
    field: keyof Habit;
    habitToUpdate: Partial<Habit>;
};

async function putHabit({ field, habitToUpdate }: PutHabit, username: string) {
    return await axios.put(
        "/api/db/habits",
        { field, habitToUpdate },
        { params: { username } }
    );
}

export function usePutHabit() {
    const { username } = useAuth().currentUser;

    const response = useMutation<any, any, PutHabit>("putHabit", (habit) =>
        putHabit(habit, username)
    );
    return response;
}

// DELETE HABIT
export function useDeleteHabit(habitId: Habit["habitId"]) {
    const url = useAuthUrl("/api/db/habits/id");
    const response = useMutation<
        Array<{ habitId: Habit["habitId"] }>,
        any,
        typeof habitId
    >(["deleteHabit", habitId], async (habitId) => {
        const { data } = await axios.delete(url, {
            data: { habitId },
        });
        return data;
    });
    return response;
}
