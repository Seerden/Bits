## Functionality
A `CompactHabit` instance displays the habit's name, completion matching the displayed date range (which is controlled by `Timescale.tsx`) and possibly tags, depending on how we end up implementing the tagging/categorization system.

## Implementation notes:
- By default, completion entries won't be present in the database until their default state has been adjusted at least once.
    
    For the entries that aren't marked, we'll just generate (and style) them on the client using the habit's properties, and allow the user to mark them regardless (and when they do, we send the entry to the database). 

    - if a habit has type `toggle`, we'll put it into the database the first time the user checks toggles it. 
        - if the user then unchecks it, we'll just set `completed` to `false` in the database, instead of dropping the row from the table.

        `range`-typed will work similarly. Start with value 0, POST/PUT on blur or similar.

    - habit completion entries that aren't present in the database will thus be considered unchecked/uncompleted (or in case of an `interval` habit, it'll have value `0` on render)

### Data flow
- To display a habit (either as a modal or in a compact form), we need access to pretty much every one of its database fields.
    - Habits and completion entries are fetched in a hook and passed by Habits.tsx to each CompactHabit
    - Each CompactHabit then takes the partitioned dates and renders a HabitEntry for each partition, each containing all completion entries for that partition.
        - Existing completion entries (passed to CompactHabit as the `completionData` prop) have to be inserted in the correct spot. All the other completion entries we render should start in the default state (unchecked in case of toggleable habit, value 0 in case of range habit)