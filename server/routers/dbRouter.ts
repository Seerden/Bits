import express from 'express';
import { makePooledQuery } from '../db/dbQuery';

const dbRouter = express.Router();

dbRouter.get('/', (req, res) => {
    res.send('GET /db/ successful')
});

// Test query: select all users and return as json
dbRouter.get('/users', async (req, res) => {
    const { rows } = await makePooledQuery({
        name: 'get users',
        text: 'select * from users'
    });

    res.json(rows)
})

export default dbRouter;