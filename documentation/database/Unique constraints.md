We have a good use case for a table where the primary key is a combination of fields:

Table `habithistories` contains at most one row for each unique combination of (habit_id, habit_entry_date, entry_index).

- If a habit (habit_id) already has an entry for a given combination (habit_entry_date, entry_index), we never want to insert another row with those exact values.
    - Thus, we can either
        1. set the `PRIMARY KEY` for the habithistories table to (habit_id, habit_entry_date, entry_index)
        2. add a constraint, like 
        
            ```sql 
            constraint unique_completion_combination unique (habit_id, habit_entry_date, entry_index)
            ```
    - Doing that, we can create a single insertOrUpdateCompletionEntry query that looks like 

        ```sql
        insert into habithistories h (habit_id, habit_entry_date, entry_index, completed, range_value)
        on conflict on constraint unique_completion_combination do update
        set ...
        ```