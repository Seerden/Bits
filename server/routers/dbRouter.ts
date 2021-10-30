import { NewHabit } from '@shared/types/Habit';
import express from 'express';
import { getUsers } from '../db/queries/getUsers';
import { insertHabit } from '../db/queries/insertHabit';
import { insertUser } from '../db/queries/insertUser';

const dbRouter = express.Router();

dbRouter.get('/', (req, res) => {
    res.send('GET /db/ successful')
});

// Test query: select all users and return as json
dbRouter.get('/users', async (req, res) => {
    const rows = await getUsers();
    res.json(rows)
})

dbRouter.post('/user', async (req, res) => {
    const { username, password } = req.body;

    try {
        const insertedUser = await insertUser(username, password);
        res.send(insertedUser);
    } catch (e) {
        res
            .status(401)
            .send({
                success: false,
                message: "Error inserting user into database. Perhaps the username already exists."
            })
    }
})

dbRouter.post('/habit', async (req, res) => {
    const newHabit: NewHabit = req.body;

    try {
        const insertedHabit = await insertHabit(newHabit);
        res.send(insertedHabit);
    } catch (error) {
        console.error(error.stack)
        res.status(400).send({ 
            message: 'Error inserting habit into database',
            error
        })
    }
})

export default dbRouter;