import { DateRange } from '@shared/types/Date';
import { NewHabit } from '@shared/types/Habit';
import express from 'express';
import { getHabits, getHabitsByUser, getHabitsInRange } from '../db/queries/getHabits';
import { insertHabit } from '../db/queries/insertHabit';
import completionRouter from './completionRouter';

const habitRouter = express.Router({ mergeParams: true });
habitRouter.use('/completion', completionRouter);

habitRouter.get('/', async (req, res) => {
    try {
        const habits = await getHabits();
        res.send(habits);
    } catch (error) {
        res.status(401).send('Error fetching habits from database')        
    }
});

habitRouter.get('/range', async (req, res) => {
    const dateRange = req.query as unknown as DateRange;
    const response = await getHabitsInRange(dateRange as DateRange);

    res.send(response);
});

habitRouter.get('/u/:username', async (req, res) => {
    try {
        const habits = await getHabitsByUser(req.params.username);
        res.send(habits)
    } catch (error) {
        res.status(401).send('Error fetching habits from database')        
    }
});

habitRouter.post('/', async (req, res) => {
    const newHabit: NewHabit = req.body;

    try {
        const insertedHabit = await insertHabit(newHabit);
        res.send(insertedHabit);
    } catch (error) {
        console.error(error.stack)
        res.status(401).send({ 
            message: 'Error inserting habit into database',
            error
        })
    }
});

export default habitRouter;

