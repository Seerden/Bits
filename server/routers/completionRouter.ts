import { NewCompletion } from '@shared/types/Completion';
import express from 'express';
import { insertOrUpdateCompletion } from '../db/queries/insertOrUpdateCompletion';

const completionRouter = express.Router({ mergeParams: true });

completionRouter.put('/', async (req, res) => {
    const completionEntry: NewCompletion = req.body;
    const rows = await insertOrUpdateCompletion(completionEntry);
    res.send(rows);
});

export default completionRouter;