import { usePostNewHabit } from "helpers/api/habit-mutate";
import { getCurrentTimestepStartOf } from "helpers/time/makeDate";
import { useAuth } from "hooks/useAuth";
import { useCallback, useEffect, useReducer } from "react";
import { useLocation, useNavigate } from "react-router";
import type { NewHabit } from "../../../../shared/types/Habit";

const defaultHabit: Omit<NewHabit, "userId"> = {
    habitName: "",
    description: null,
    startDate: getCurrentTimestepStartOf("day").toDate(),
    endDate: null,
    completionFrequency: 1,
    completionType: "toggle",
    completionInterval: 1,
    completionTimescale: "day",
    unit: "",
};

// @todo: this doesn't quite accomplish what I want
//      (value is still left as a union of string | number | date,
//      instead of just the type belonging to that specific property)
type ReducerProps<T extends keyof typeof defaultHabit> = {
    formField: T;
    value: NewHabit[T];
};

/**
 * Determine if newHabit is valid for submission
 * by checking whether the habit has a name,
 * and whether the completion settings are correct
 */
function isValidNewHabit(newHabit: Omit<NewHabit, "userId">): boolean {
    const { habitName, completionType, completionInterval, unit } = newHabit;

    const hasValidName = habitName.length > 0;
    const hasValidCompletion =
        (completionType === "interval" && completionInterval > 0 && unit.length > 0) ||
        completionType === "toggle";

    return hasValidName && hasValidCompletion;
}

function reduceNewHabitForm(
    state: typeof defaultHabit,
    { formField, value }: ReducerProps<keyof typeof defaultHabit>
): typeof defaultHabit {
    return { ...state, [formField]: value };
}

/**
 * This hook provides the functionality for the NewHabit form
 */
export function useNewHabit() {
    const [newHabit, dispatchNewHabit] = useReducer(reduceNewHabitForm, defaultHabit);
    const { mutate, isSuccess } = usePostNewHabit();
    const { currentUser: user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (isSuccess) {
            if (location.pathname === "/habits") {
                navigate(0);
            } else {
                navigate("/habits");
            }
        }
    }, [isSuccess]);

    const handleSubmitNewHabit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            e.stopPropagation();

            isValidNewHabit(newHabit) &&
                mutate({
                    ...newHabit,
                    userId: user.userId,
                });
        },
        [newHabit]
    );

    return [newHabit, dispatchNewHabit, handleSubmitNewHabit] as const;
}
