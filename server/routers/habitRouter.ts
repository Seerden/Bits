import { Completion } from '@shared/types/Completion';
import { DateRange } from '@shared/types/Date';
import { Habit, NewHabit } from '@shared/types/Habit';
import express from 'express';
import { getHabits, getHabitsByUser, getHabitsWithCompletion } from '../db/queries/getHabits';
import { insertHabit } from '../db/queries/insertHabit';
import { updateHabit } from '../db/queries/updateHabit';
import { isPermitted } from '../lib/middleware';
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

habitRouter.get('/range/ids', isPermitted, async (req, res) => {
    const { from, to } = req.query as unknown as DateRange;
    const dateRange = { from, to };
    const { habitIds }: { habitIds: string[]} = req.query as any; 
    const { username }: { username: string } = req.query as any;

    let habits: Habit[], completions: Completion[];

    if ('habitIds' in req.query) {
        [habits, completions] = await getHabitsWithCompletion({ dateRange, habitIds });
    } else {
        [habits, completions] = await getHabitsWithCompletion({ dateRange, username });
    };

    const response = habits.map(habit => {
        const completionsForHabit = completions.filter(completion => completion.habitId === habit.habitId);

        return {
            habitData: habit,
            completionData: completionsForHabit
        }
    })
    
    res.json(response);
})

habitRouter.get('/u/:username', isPermitted, async (req, res) => {
    try {
        const habits = await getHabitsByUser(req.params.username);
        res.send(habits)
    } catch (error) {
        res.status(401).send('Error fetching habits from database')        
    }
});

habitRouter.post('/', isPermitted, async (req, res) => {
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

habitRouter.put('/', isPermitted, async (req, res) => {
    const habitToUpdate = req.body.habitToUpdate as Partial<Habit>;
    const field = req.body.field as keyof Habit;

    try {
        res.json(await updateHabit(field, habitToUpdate))
    } catch (error) {
        console.error;

        res.status(401).json({ message: JSON.stringify(error) })
    }
});

export default habitRouter;

