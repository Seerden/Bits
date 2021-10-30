import { usePostNewHabit } from "helpers/api/habitMutation";
import { useAuth } from "hooks/useAuth";
import { useCallback, useEffect, useReducer } from "react";
import type { NewHabit } from '../../../../shared/types/Habit';

const defaultHabit: Omit<NewHabit, 'userId'> = {
    habitName: '',
    description: null,
    startDate: null,
    endDate: null,
    completionFrequency: 1,
    completionType: 'toggle',
    completionInterval: null,
    completionTimescale: 'day'
}

type ReducerProps<T extends keyof typeof defaultHabit> = {
    formField: T,
    value: NewHabit[T]
} 
// @todo: this doesn't quite accomplish what I want 
//      (value is still left as a union of string | number | date, 
//      instead of just the type belonging to that specific property)

/**
 * Determine if newHabit is valid for submission 
 * by checking whether the habit has a name, 
 * and whether the completion settings are correct
 */
function isValidNewHabit(newHabit: Omit<NewHabit, 'userId'>): boolean {
    const { habitName, completionType, completionInterval } = newHabit;

    const hasValidName = habitName.length > 0;
    const hasValidCompletion = (completionType === "interval" && completionInterval > 0) || (completionType === 'toggle');

    return hasValidName && hasValidCompletion;
}

function reduceNewHabitForm(
    state: typeof defaultHabit,
    { formField, value }: ReducerProps<keyof typeof defaultHabit>
): typeof defaultHabit {
    return { ...state, [formField]: value };
};

/**
 * This hook provides the functionality for the NewHabit form
 */
export function useNewHabit(props?: any) {
    const [newHabit, dispatchNewHabit] = useReducer(reduceNewHabitForm, defaultHabit);
    const { data, mutate, isSuccess } = usePostNewHabit();
    const { currentUser: user } = useAuth();

    // @dev: alert successful post
    useEffect(() => {
        isSuccess && alert('New habit POST successful')
    }, [isSuccess]);

    const handleSubmitNewHabit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        isValidNewHabit(newHabit) && mutate({
            ...newHabit,
            userId: user.userId
        });

    }, [newHabit]);

    // @todo: handle successful/failed mutation

    return [newHabit, dispatchNewHabit, handleSubmitNewHabit] as const;
};