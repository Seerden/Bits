import { Completion, NewCompletion } from '@shared/types/Completion';
import express from 'express';
import { insertCompletion } from '../db/queries/insertCompletion';
import { updateCompletion } from '../db/queries/updateCompletion';

const completionRouter = express.Router({ mergeParams: true });

completionRouter.post('/', async (req, res) => {
    const newCompletion: NewCompletion = req.body;
    const rows = await insertCompletion(newCompletion);
    res.send(rows);
});

completionRouter.put('/', async (req, res) => {
    const completionData: Partial<Completion> = req.body;
    const rows = await updateCompletion(completionData);
    res.send(rows);
})

export default completionRouter;