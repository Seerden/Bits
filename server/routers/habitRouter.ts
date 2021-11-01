import { Completion } from '@shared/types/Completion';
import { DateRange } from '@shared/types/Date';
import { Habit, NewHabit } from '@shared/types/Habit';
import express from 'express';
import { getHabits, getHabitsByUser, getHabitsWithCompletion } from '../db/queries/getHabits';
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

habitRouter.get('/range/ids', async (req, res) => {
    const { from, to } = req.query as unknown as DateRange;
    const { habitIds }: { habitIds: string[]} = req.query as any; 

    const [habits, completions] = await getHabitsWithCompletion({ from, to }, habitIds) // as [Habit[], Completion[]];

    const response = habits.map(habit => {
        const completionsForHabit = completions.filter(completion => completion.habit_id === habit.habit_id);

        return {
            habitInfo: habit,
            completionInfo: completionsForHabit
        }
    })
    
    res.send(response);
})

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

