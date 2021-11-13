## Computing overall habit completion percentage.

To compute, as a percentage, how well someone is sticking to a given habit, we need `habit` data and corresponding `completion` data.

- `completionFrequency` and `completionTimescale` together determine how often someone aims to perform a task.
    - Example:
        ```javascript
        { 
            completionFrequecy: 1,
            completionTimescale: 'week'
        } 
        ```
        means the user intends to complete the task per calendar week.
- Completion entries need to be grouped into groups of matching `completionTimescale` intervals.

    For each group, we can determine whether the user was successful in performing the habit:
    - for each instance, compute `isSuccessful`.

        - If completionType === 'toggle', use
        ```javascript
        const isSuccess = completion.completed
        ```
        - If completionType === 'interval', we use habit.completionInterval and completion.rangeValue

        ```js
        const isSuccess = completion.rangeValue >= habit.completionInterval
        ```

    - count how many successful entries there are in each group, -- call this `groupSuccessCount`
    - For each group, compare `groupSuccessCount` to `habit.completionFrequency` to determine `groupIsSuccess`
    - Count total intervals, and successful intervals. Computing `successPercentage` is trivial from here.

There is a small nuance here in that we need to determine whether the currently ongoing interval is considered for completion. It's not quite fair to mark a habit `({ completionTimescale: 'week'})` 'unsuccessfully' completed for the week if it's only Tuesday, for example.
