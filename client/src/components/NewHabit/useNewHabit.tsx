import { useEffect, useReducer } from "react";

enum HabitTypeEnum {
    TOGGLE = 'toggle',
    RANGE = 'range'
}

enum Frequencies {
    DAILY = 'daily', 
    WEEKLY = 'weekly',
    MONTHLY = 'monthly'
}

type Habit = {
    name: String,
    description: String,
    type: HabitTypeEnum.TOGGLE | HabitTypeEnum.RANGE,
    frequency: Frequencies.DAILY | Frequencies.WEEKLY | Frequencies.MONTHLY,
    history?: any[]  // @todo: habit histories not yet implemented
}

const defaultHabit: Habit = {
    name: '',
    description: '',
    type: HabitTypeEnum.TOGGLE,
    frequency: Frequencies.DAILY
}

function reduceNewHabitForm(state: Habit, { formField, value }) {  // @todo: implement reducer to handle NewHabit form input onChange events
    switch (formField) {
        case 'name':
        case 'description':  // overload switch case to perform same logic for various fields
        case 'frequency':
        case 'type':
            return {...state, [formField]: value};
        
        default:
            return state;
    }

    // or replace the switch statement with a mapping of some kind, depending on how complex the form logic gets
}

export function useNewHabit(props?: any) {
    const [newHabit, dispatchNewHabit] = useReducer(reduceNewHabitForm, defaultHabit);

    // useEffect(() => {  // @dev: log changes to newHabit form on change
    //     console.log(newHabit);
    // }, [newHabit])

    return [newHabit, dispatchNewHabit] as const;
};