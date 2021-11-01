When querying the database for a habit or list thereof, we join the each `habit` with entries of `habithistory` to create a list of Habit & Completion (where type Completion refers to an entry in the `habithistories` table).

Since habits and their histories go hand-in-hand in most places in the client, it's easiest to shape this merged Habit & Completion type into something easier to group by, render, and perform CRUD updates on.

Thus, the objects we send from the API to the client will look something like this:

```javascript
    {
        habitInfo: Habit,
        completionInfo: Completion[]
    }
```

The most resource-efficient way to pass this data around is to transform the database response into the above type on the server-side. That way, we send as little empty data as possible. Because of the way the `habithistories` table works, we don't generate entries by default, we only insert them into the database once the user (on the client-side) interacts with a specific habit for a given date (e.g. by marking that they completed a certain habit). 

We have two options for creation of this data:
1. Perform two database queries. Once to retrieve each of the requested habits, and one to retrieve all completion entries for those habits, for the given date range. Iterate over each response once to form a list where each entry contains all of a single habit's information and the information of the corresponding completion entries.
2. Perform a single query, joining the `habit` and `habithistories` tables, and manually transform the response into the shape we want to send to the client.

The first seems the easiest, most concise method, since we need to do some manual parsing on the server-side anyway, there's no real point in joining the data on the database.