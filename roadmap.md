# Stack:
- React for frontend.
- TypeScript on front- and backend.
- PostgresQL for persistence. Go with REST, since mixing a new DB technology and implementing a GraphQL strategy right away is too hectic.
- Framer or Spring for animation. Along with the new DB tech, this is one of the main learning objectives for this project.
- Deploy from a Docker image, on a DigitalOcean droplet
- Try to implement OAuth for authentication, or try an e-mail verification strategy if it seems too messy for DX for some reason.

# Components
## NewHabit
### Description:
`NewHabit` form. Allows users to specify a new habit they wish to track.

## TODO:
- Create minimum viable version of the form;
    - [x] Implement reducer in useNewHabit to update newHabit state based on user input.
    - [x] Implement onChange handlers that call the reducer, for each field in NewHabit.
    - [x] Set up database skeleton on the backend.
    - [] Implement REST route on front- and backend to (GET, PUT and) POST Habits.

- Create Habit completion timeline;
    - [] Start conceptualizing the task timeline layout and functionality. 

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