import express from 'express';

const dbRouter = express.Router();

dbRouter.get('/', (req, res) => {
    res.send('GET /db/ successful')
});

export default dbRouter;