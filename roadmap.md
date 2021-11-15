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
- Implement dark/solarized styles
- Generalize styling more, import bits and pieces as needed instead of creating each class from scratch
- Figure out whether we want to refer to Timescales as 'timescale', 'timestep' or something else entirely, and _be consistent with usage_
- (client) add symlink to top-level /shared folder so imports from it aren't prepended by '../../../../'

## Per component
### Register
- [] Implement meaningful feedback messages ("passwords don't match", "username already exists", etc.)

### Habits
- [] figure out a more elegant way to switch between timescales than the button we currently use
- [] add date tooltips?

### NewHabit
- Change route to /habits/new

### CompactHabit
- Figure out how to efficiently update habitEntries after a PUT request, so that switching to another timescale displays the newly updated completion entry
    - Put completionData in state, update this state with data returned from PUT (make sure the PUT entry is in the right spot), and pass this state to HabitDetails. Then, ProgressIcon also correctly rerenders on change.

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