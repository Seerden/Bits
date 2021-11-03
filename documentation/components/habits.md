`Habits` is the component corresponding to the application's main view. In it, we compose the view, containing various elements:
- `Timescale`: 
    - the list of dates for which we want to display habits and their completion
- `CompactHabits`: 
    - `CompactHabit`[], where each `CompactHabit` represents one habit 
        - displays its name, 
        - displays the completion entries for that habit the dates on display (which, again, are controlled through `Timescale`)
        - includes a way to expand the view from `CompactHabit` to `HabitModal` (component name TBD), in which a more complete overview of that Habit's history, including perhaps a simple statistical overview of the completion history for that habit (percentage successfully completed, etc.)
- a button to toggle display of a NewHabit form, which allows for inline creation of a new habit.

## Data
- Habits and their completion histories are fetched by a hook.
    - Each habit is passed to a CompactHabit instance

        CompactHabit renders HabitEntry[] or HabitInstance[]
        - Each HabitInstance needs to know which date it belongs to, so these have to be passed down somehow
            - Compute dates and partitions in `useHabits`
            1. [] store in useState and pass to CompactHabit through props
            2. [x] store in atom and load wherever we need them
                - Partitions are derived from `datesInRange` and `timestep`, so `partitions` should be stored as memo or selector