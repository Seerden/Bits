## Habits
Since this is a habit tracker, habits are the core data of this application. The type definition of a single Habit entry is given below, though note that the implementation will be spread across various database tables to adhere to normalization principles.

## Definition
```javascript
{
    user: String,
    name: String,
    description?: String,
    tags: Unkown[],  // Categorization/tagging yet to be conceptualized
    completionType: 'interval' | 'toggle',
    completionTimescale: 'day' | 'week' | 'month' | 'year',
    completionFrequency: Number[],
    completionInterval?: Number[]
    timespan: {
        start: Date,
        end: Date
    },
    completionHistory: { 
        date: Date, 
        history: Number[] 
    }[]
}
```

Each Habit belongs to a `user`, and we refer to a habit in the UI by its `name`. A user may decide to specify a short `description`, which will be visible in an expanded UI element containing information about that habit specifically, and also to categorize their Habits with as many `tags` as they see fit. A user may filter their habits by tag, and the tags may decide elements of styling in the UI. The `timespan` of the Habit indicates the date interval in which the user wants to track that specific Habit. Think of a wedding planning, where the planning doesn't have to continue beyond the date of the wedding itself.

Tracking each habit's completion differs depending on its `completionType`: a `toggle` indicates the user only wants to know whether they did or didn't do something, but an `interval` allows a range of inputs, where `completionInterval` indicates the target value for successful task completion. An example of this would be "number of steps taken per day", where the user's target may be 10,000, but they might want to specifically record reaching 8,000 steps that day, instead of marking that habit 'not completed' that day.

The `completionTimescale` and `completionFrequency` indicate on what timescale the habit acts and how many times the user gets to mark the habit on that timescale.
- example:
    ```javascript
        { 
            completionTimescale: 'day',
            completionFrequency: 2,
            completionInterval: 2500
        }
    ```
    This might correspond to a user wanting to walk 2500 steps twice a day. Every day, the user will have two instances of this habit to mark.


## Open questions and thoughts
We could complicate the data structure more by allowing for specific dates or recurring criteria on which the user wishes the track the habit ('pay rent the 1st of every month', etc.), but at that point we'd pretty much be turning this application into a calendar.