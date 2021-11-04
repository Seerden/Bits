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
## Habits
- change styling so that `Timescale` and `CompactHabit`s are better aligned and more visually connected
- figure out a more elegant way to switch between timescales than the button we currently use
- add date tooltips?
## CompactHabit
- Click to expand to ExpandedHabit modal
    - Implement ExpandedHabit modal
- Click name to swap to editable input
    - Add functionality to update habit names and descriptions
- Only display entries starting from the habit's `startDate` || `creationDate`
    - add `habit.creationDate` field
## HabitRangeInstance
- fix uncontrolled <-> controlled input warning
- fix styling to fit into HabitEntry list entries
- add tooltip with `habitEntryDate`
## HabitToggleInstance
- add tooltip with `habitEntryDate`
- improve styling
    - add hover styles
    - play around with default style