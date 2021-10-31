## Notes
- this component's name should be changed to something more semantically relevant. It's not a scale, it's a list of dates. More suitable names would be DateList, DisplayDates, HabitDateRange, etc.
- dates supplied to this component have to be part of a shared state, because we need to pass the date belonging to every HabitEntry/HabitInstance to those components, for accessibility reasons, among others.

## Functionality:
- displays the dates belonging to the habits currently being shown. 
    - although we don't implement the habit tracker as an actual HTML table, the layout will end up similar to a table. if the habit tracker was an actual table, this component would, among other uses, act as the header of that table.
- include a button to toggle between various timesteps (day, month, etc.)
- options to consider for changing the displayed date range:
    - ? scroll through the habits
    - ? add a date picker to choose start and end date
    - add a button next to start and end dates to go back a set number of dates

