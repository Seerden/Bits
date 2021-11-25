import axios from "axios";
import { useAuthUrl } from "hooks/useAuthUrl";
import { useQuery } from "react-query";
import { Habit } from "../../../../shared/types/Habit";

export function useFetchCompletionsById(habitId: Habit["habitId"]) {
    const url = useAuthUrl("/api/db/habits/completion/id");

    const response = useQuery(
        ["fetchCompletionsById", habitId],
        async () => {
            const { data } = await axios.get(url, {
                params: { habitId },
            });
            return data;
        },
        { enabled: false, retry: false }
    );

    return response;
}
