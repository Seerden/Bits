## Implementing a new API endpoint:
To fully implement a new API call on the client and server, the following needs to happen:

- Client
    - Create a function to make a RESTful request (we use Axios, but could use any other fetching implementation) to the desired endpoint, passing any query parameters or request bodies that need to be passed
    - Create a query (`useQuery`) or mutation (`useMutation`) hook that calls this function
    - Call the query/mutation hook wherever we need it

- Server
    - Create a function that executes a query on the database.
        - the function should be split up into a query constructor (put this in `/db/queries/constructors`) and a query operation (put this in `/db/queries/operations`).
        - the function either calls `makePooledQuery` or `makePooledQueries` depending on the type of query/queries that need to be made.
    - Call this function, and any other functions necessary to derive the desired response from the pure database response, on the router handler corresponding to the desired endpoint