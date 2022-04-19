Bits is a habit tracker in the form of a single-page web-application. The application is currently _not_ live on [🔵 bits.seerden.xyz](https://bits.seerden.xyz)

## Showcase/overview

### Features

-   create habits with customized completion targets.

    Examples:

    -   "walk 3000 steps every day",
    -   "work on a project for 5 hours, 3 days a week"

-   track completion over time
    -   mark completion as often as you like
    -   filter habits to display only habits yet-to-be completed in the current time cycle

### Showcase

@todo -- include gifs, screenshots

## Stack

Bits is built with

-   **SASS** for styling (styles from scratch)
-   **TypeScript** (JavaScript)
-   **React** on the front-end
    -   **Recoil** and **React Query** for UI and server state management
    -   **Framer Motion** for animations
-   **Node.js** (TypeScript) on the back-end
    -   **Express** for our RESTful API
    -   **node-postgres** (pg) for interaction with our PostgreSQL database
-   **PostgreSQL** as database

and is deployed for production with **Webpack** for client bundling, on **DigitalOcean** using **Docker** and **Nginx**.

## Running the project

-   clone this repository

### Client:

-   to run the client:
    -   `cd client && npm install`
    -   run `npm run serve` while inside the `/client` directory

### Backend:

Choose (1) or (2):

#### 1. run on local machine

-   install Postgres
-   create a database, call it 'bits'
-   create a `.env` file in `/server/` and include the `PG_*` variables outlined in the next section. Use the values belonging to the database you just created.
-   after connecting to the database, execute at least `1_bits.sql` in `/database`. `2_connect.sql` is related to the backend session store we use, and doesn't need to be run (its output is already included in `1_bits.sql`, but we leave the file for posterity)

#### 2. run with containerized backend

The server and database are containerized using `docker-compose`.

Create a `.env` file inside `/server/` containing the following variables:

-   `PG_HOST` postgres host. For local development, this should be 'localhost'
-   `PG_USER` database owner username. Recommend something generic like 'postgres'
-   `PG_PASS` password belonging to the database owner.
-   `PG_DATABASE` Postgres database name
-   `SESSION_SECRET` server-side session secret, should be a string
-   `SALT_ROUNDS` number of salt rounds for bcrypt. Have a look at [this discussion](https://security.stackexchange.com/questions/17207/recommended-of-rounds-for-bcrypt) for background.

To launch the server and database:

```sh
docker-compose --env-file ./server/.env up --build db server
```

Client and server should now be available on localhost:3000 and localhost:5000 respectively.
