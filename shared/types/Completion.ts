export type BaseCompletion = {
    completionType: 'toggle' | 'interval',
    habitId: string,
    habitEntryDate: Date | string,  
        // @todo: somehow habitEntryDate ends up as a string on the client, 
        // even though it's a date on the backend and I send it in JSON format
    entryIndex: number
};

export interface NewRangeCompletion extends BaseCompletion {
    rangeValue: number
};

export interface NewToggleCompletion extends BaseCompletion {
    completed: boolean
};

type CompletionId = { completionId: number };

export type ToggleCompletion = NewToggleCompletion & CompletionId;
export type RangeCompletion = NewRangeCompletion & CompletionId;
export type NewCompletion = NewRangeCompletion & NewToggleCompletion;
export type Completion = ToggleCompletion & RangeCompletion;