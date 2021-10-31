import { NewCompletion } from '@shared/types/Completion';
import express from 'express';
import { insertCompletion } from '../db/queries/insertCompletion';

const completionRouter = express.Router({ mergeParams: true });

completionRouter.post('/', async (req, res) => {
    const newCompletion: NewCompletion = req.body;

    const rows = await insertCompletion(newCompletion);

    res.send(rows);
});

export default completionRouter;