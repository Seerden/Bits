import axios from "axios";
import { useAuth } from "hooks/useAuth";
import { useMutation } from "react-query";
import { Completion, NewCompletion } from "shared/types/Completion";

/**
 * Make a PUT request to update a completion entry
 */
async function putCompletion(completionToUpdate: NewCompletion, username: string) {
    try {
        const { data } = await axios.put(
            "/api/db/habits/completion",
            completionToUpdate,
            {
                params: { username },
            }
        );
        return data;
    } catch (error) {
        console.error;
    }
}

export function useMutateCompletion() {
    const { username } = useAuth().currentUser;
    const response = useMutation<Completion, unknown, NewCompletion>(
        "mutateCompletion",
        async (completion) => {
            return await putCompletion(completion, username);
        }
    );
    return response;
}
