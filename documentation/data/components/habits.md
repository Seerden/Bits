`Habits` is the component corresponding to the application's main view. In it, we compose the view, containing various elements:
- `Timescale`: 
    - the list of dates for which we want to display habits and their completion
- `CompactHabits`: 
    - `CompactHabit`[], where each `CompactHabit` represents one habit 
        - displays its name, 
        - displays the completion entries for that habit the dates on display (which, again, are controlled through `Timescale`)
        - includes a way to expand the view from `CompactHabit` to `HabitModal` (component name TBD), in which a more complete overview of that Habit's history, including perhaps a simple statistical overview of the completion history for that habit (percentage successfully completed, etc.)
- a button to toggle display of a NewHabit form, which allows for inline creation of a new habit.