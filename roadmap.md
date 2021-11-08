# Stack:
- React for frontend.
- TypeScript on front- and backend.
- PostgresQL for persistence. Go with REST, since mixing a new DB technology and implementing a GraphQL strategy right away is too hectic.
- Framer or Spring for animation. Along with the new DB tech, this is one of the main learning objectives for this project.
- Deploy from a Docker image, on a DigitalOcean droplet
- Try to implement OAuth for authentication, or try an e-mail verification strategy if it seems too messy for DX for some reason.

# Learning objectives and overview
- [] Testing React reducers
- [] Add an animation library to my frontend skillset:
    - [] Learn the basics of an animation library (Framer/Spring).
    - [] Implement a few minimal, nonobstructive, yet interesting animations in this project.
- [x] Become more adept at SQL:
    - [x] Learn PostgreSQL.
    - [x] Use `pg` as database in this project.
- [] Learn Docker:
    - [] Deploy project as image on Docker
        - [] Host project on DO droplet, launch from containers
        - [] Build and launch the database, including tables, from scratch using Docker

# Todo
## General
- [x] Implement authentication on the frontend
    - [x] Think about whether or not we need protected components eventually
    - [x] include login, logout, register buttons to `Header`
    - [x] include current user query param in requests from client
- [x] Add authentication middleware that checks whether user making a request is allowed to make that request
- [x] Add routing (`react-router v6`)
- Implement dark/solarized styles
- Generalize styling more, import bits and pieces as needed instead of creating each class from scratch
- Figure out whether we want to refer to Timescales as 'timescale', 'timestep' or something else entirely, and _be consistent with usage_
- (client) add symlink to top-level /shared folder so imports from it aren't prepended by '../../../../'

## Per component
### Register
- [x] Automatically log in on succesful registration
- [] Implement meaningful feedback messages ("passwords don't match", "username already exists", etc.)
- [] highlight non-matching passwords

### Habits
- change styling so that `Timescale` and `CompactHabit`s are better aligned and more visually connected
- figure out a more elegant way to switch between timescales than the button we currently use
- add date tooltips?
- [x] add button that toggles (inline?) NewHabitEntry form on click
    - Style button
    - Add another button that hides the form on click or successful NewHabit POST

### NewHabit
- split up into components
- make note that start and end dates are optional
    - default start date to 'today'
    - [x] fix: end date is currently showing as a 'text' input
- style inputs
- style form to match CompactHabit, at least in width
- style submission button
- add functionality to handle successful PUT/POST
    - add newly created habit to `habits` in state, so that a new CompactHabit is added to the list

### CompactHabit
- Click to expand to ExpandedHabit modal
    - Implement ExpandedHabit modal
- Click name to swap to editable input
    - [] Add key handlers for escape (to discard changes) and enter (to trigger blur)
- Only display entries starting from the habit's `startDate` || `creationDate`
    - add `habit.creationDate` field
- Figure out how to efficiently update habitEntries after a PUT request, so that switching to another timescale displays the newly updated completion entry

### HabitRangeInstance
- add tooltip with `habitEntryDate`

### HabitToggleInstance
- add tooltip with `habitEntryDate`
- improve styling
    - add hover styles
    - play around with default style

### WeeklyEntry
- rename to something that reflects the fact it's actually a list of partitions, with each partition belonging to a single 'entry'
- think about styling in the following cases:
    - multiple entries per day (i.e. `habit.completionFrequency` > 1)
    - `habit.completionType = 'interval'`
    - a combination of the above
- add on-hover tooltip displaying an entry's date
- add on-click functionality to expand to daily view (as a modal? as `ExpandedHabit`?)

### MonthlyEntry
- like WeeklyEntry, rename to be more semantically correct
- implement functionality
    - note that functionailty is mostly similar to WeeklyEntry, except we want to structure this like a calendar entry, where each row represents a week
        - think of structuring cells differently depending on whether start-of-week is Sunday/Monday or some other day