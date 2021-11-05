import { NewCompletion } from '@shared/types/Completion';
import express from 'express';
import { insertOrUpdateCompletion } from '../db/queries/insertOrUpdateCompletion';
import { isPermitted } from '../lib/middleware';

const completionRouter = express.Router({ mergeParams: true });

completionRouter.put('/', isPermitted, async (req, res) => {
    const completionEntry: NewCompletion = req.body;
    const rows = await insertOrUpdateCompletion(completionEntry);
    res.send(rows);
});

export default completionRouter;