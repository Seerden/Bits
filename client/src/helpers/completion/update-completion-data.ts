import { Completion } from "../../../../shared/types/Completion";

/**
 * Either:
 * - add `completion` to `completionData`
 * - update value in `completionData` where value.completionId === completion.completionId
 * @returns updated version of completionData
 * @usage used this to update completionData in a piece of state without having to refetch
 * data from the API.
 */
export function updateCompletionData(
    completionData: Completion[],
    completion: Completion
) {
    const copy = [...completionData];
    // see if there's already a value with completion.completionId in completionData
    const completionIndex = copy.findIndex(
        (val) => val.completionId === completion.completionId
    );

    if (completionIndex > -1) {
        // if entry already exists, update its value
        copy[completionIndex] = completion;
    } else {
        // if entry doesn't exist yet, add it to the array
        copy.push(completion);
    }
    return copy;
}
