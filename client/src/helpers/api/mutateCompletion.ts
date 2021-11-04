import axios from "axios";
import { useMutation } from "react-query";
import { Completion } from "../../../../shared/types/Completion";

/**
 * Make a PUT request to update a completion entry
 */
async function putCompletion({ entryIndex, habitEntryDate, completed, rangeValue }: Partial<Completion>) {
    try {
        const response = await axios.put(
            '/api/db/completion',
            {
                entryIndex, habitEntryDate, completed, rangeValue
            }
        );
        return response.data
    } catch (error) {
        console.error
    }
};

/**
 * Make a POST request to send a new completion entry to the database
 */
async function postCompletion(newCompletion: Partial<Completion>) {
    try {
        const response = await axios.post('/api/db/habits/completion', newCompletion);
        return response.data;
    } catch (error) {
        console.error
    }
};

/**
 * Update or create a completion entry in the database, depending on whether the entry already exists in the database
 */
async function putOrPostCompletion(completion: Partial<Completion>) {
    try {
        if (completion.completionId) {
            return await putCompletion(completion);
        } else {
            return await postCompletion(completion)
        }
    } catch (error) {
        console.error
    }
};

export function useMutateCompletion() {
    const response = useMutation<Completion[], any, Partial<Completion>>(
        'mutateCompletion',
        async (completion) => {
            return await putOrPostCompletion(completion);
        });
    return response;
};