export type BaseCompletion = {
    habitId: string,
    habitEntryDate: Date | string,  
        // @todo: somehow habitEntryDate ends up as a string on the client, 
        // even though it's a date on the backend and I send it in JSON format
    entryIndex: number
};

export interface NewCompletion extends BaseCompletion {
    rangeValue?: number,
    completed?: boolean,
    completionId?: number
};

type CompletionId = { completionId: number };

export type Completion = NewCompletion & CompletionId;