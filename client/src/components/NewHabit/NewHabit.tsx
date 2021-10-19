import './NewHabit.scss';
import { useNewHabit } from './useNewHabit';

const NewHabit = (props) => {
    const base = "NewHabit";
    const [newHabit, dispatchNewHabit] = useNewHabit();

    return (
        <div className={`${base}`}>
            <header>
                New Habit
            </header>
            <form>
                <p>
                    <label htmlFor="name">
                        Name
                    </label>
                    <input 
                        type="text" 
                        name="Name"
                        onBlur={e => dispatchNewHabit({ formField: 'name', value: e.target.value })}
                    />
                </p>

                <p>
                    <label htmlFor="description">
                        Description
                    </label>
                    <textarea 
                        name="description" 
                        placeholder="Optional"
                        onBlur={e => dispatchNewHabit({ formField: 'description', value: e.target.value })}
                    />
                </p>

                <p>
                    <label htmlFor="frequency">
                        Frequency
                    </label>
                    <select
                        name="frequency"
                        onChange={e => dispatchNewHabit({ formField: 'frequency', value: e.target.value })}
                    >
                        <option defaultValue="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                    </select>
                </p>

                <p>
                    <label htmlFor="type">
                        Type
                    </label>
                    <select 
                        name="type"
                        onChange={e => dispatchNewHabit({ formField: 'type', value: e.target.value })}
                    >
                        <option defaultValue="boolean">
                            Completed/not completed
                        </option>
                        <option value="range">
                            Range
                        </option>
                    </select>
                </p>
            </form>

        </div>
    )
}

export default NewHabit