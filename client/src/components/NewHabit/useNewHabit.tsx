import { useEffect, useReducer } from "react";
import type { NewHabit } from '../../../../shared/types/Habit';

const defaultHabit: Omit<NewHabit, 'userId'> = {
    name: '',
    description: null,
    completionFrequency: 1,
    startDate: null,
    endDate: null,
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

    return [newHabit, dispatchNewHabit] as const;
};