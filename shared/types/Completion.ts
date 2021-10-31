export type BaseCompletion = {
    habitId: string,
    habitEntryDate: Date,
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
export type NewCompletion = NewRangeCompletion | NewToggleCompletion;
export type Completion = ToggleCompletion | RangeCompletion;