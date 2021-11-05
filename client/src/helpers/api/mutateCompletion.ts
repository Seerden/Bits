import axios from "axios";
import { useAuth } from "hooks/useAuth";
import { useMutation } from "react-query";
import { Completion } from "../../../../shared/types/Completion";

/**
 * Make a PUT request to update a completion entry
 */
async function putCompletion(completionToUpdate: Partial<Completion>, username: string) {
    try {
        const response = await axios.put(
            '/api/db/habits/completion',
            completionToUpdate,
            { params: { username } }
        );
        return response.data
    } catch (error) {
        console.error
    }
};

export function useMutateCompletion() {
    const { username } = useAuth().currentUser;
    const response = useMutation<Completion[], any, Partial<Completion>>(
        'mutateCompletion',
        async (completion) => {
            return await putCompletion(completion, username);
        });
    return response;
};