## Server
- I prefer username/password combinations for authentication.
    - Other options are email/password and OAuth.
- Store a user in the database. Ensure the password is encrypted (use `bcrypt`).
- On login attempt, compare the credentials coming from the client to those stored in the database.
    - On succesful login, authenticate a session. Persist this session in some kind of session store. 
        - There are small npm packages for MongoDB and PostgreSQL that persist sessions to tables in these databases.
- Protect every API endpoint that needs to be protected with middleware that
    1. Checks if the user making the request is authorized.
    2. Checks if the authorized user is making a request for their own resources.

## Client
- Implement a piece of (global) state, like a Recoil atom, storing the currently logged in user. 
- Create an authentication hook containing the following functionality:
    - On successful login, store user in localStorage.
    - On succesful logout, remove user from localStorage.
    - As default value for the atom mentioned above, use the localStorage value.
- Whenever we make a request that returns a `NOT AUTHENTICATED` response (indicated by some kind of status code), remove the user from localStorage.
    - Consider distinguishing between the following types of response:
        - User is not logged in at all.
        - User attempts to access resources that are not accessible by them.
    - Private routes will exist on the client, so that if the user is no longer logged in, we can simply direct them to a Login component.
- Because we almost always want access to the credentials (username, id, role, or a combination of these), consider adding these credentials to every request that is made from the client to the server.
    1. Use a default axios parameter:
        - With axios:
            - Create an axios instance
            - Add a default query parameter to the instance (e.g. 'fromUser', 'user', 'userMakingRequest', etc.)
                - Do this by adding a request interceptor: https://stackoverflow.com/a/59050108/12820947

            - Call this axios instance in our API handlers, so, for example,instead of `axios`.get(), use `myAxiosInstance`.get()
    2. Insert a username parameter into every request that needs to be authenticated
        - Add username argument to functions that make axios requests
        - Get currentUser's username by destructuring calling useAuth().currentUser in each useQuery or useMutation hook
            - Pass this as an argument to the query/mutation function
