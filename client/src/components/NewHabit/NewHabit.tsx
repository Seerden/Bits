import './NewHabit.scss';
import { useNewHabit } from './useNewHabit';

const NewHabit = (props) => {
    const base = "NewHabit";
    const [newHabit, dispatchNewHabit] = useNewHabit();

    return (
        <form className={`${base}`}>
            <p className={`${base}__field`}>
                <label htmlFor="name">
                    Name
                </label>
                <section className="field__group">
                    <input
                        type="text"
                        name="Name"
                        onBlur={e => dispatchNewHabit({ formField: 'name', value: e.target.value })}
                    />
                </section>
            </p>

            <p className={`${base}__field`}>
                <label htmlFor="description">
                    Description
                </label>
                <section className="field__group">
                    <input
                        type="text"
                        name="description"
                        placeholder="Optional"
                        onBlur={e => dispatchNewHabit({ formField: 'description', value: e.target.value })}
                    />
                </section>
            </p>

            <p className={`${base}__field--frequency`}>
                <label htmlFor="">Frequency</label>
                <section>
                    <input
                        type="number"
                        name="frequency"
                    />
                    <span>
                        times per
                    </span>
                    <select name="" id="">
                        {
                            ['day', 'week', 'month', 'year'].map(t =>
                                <option value={t}>{t}</option>
                            )
                        }
                    </select>
                </section>
            </p>

            <p className={`${base}__field`}>
                <label htmlFor="type">
                    Type
                </label>
                <section className="field__group">
                    <select
                        name="type"
                        onChange={e => dispatchNewHabit({ formField: 'completionType', value: e.target.value })}
                    >
                        <option value="toggle">
                            Toggle
                        </option>
                        <option value="interval">
                            Range
                        </option>
                    </select>
                    {
                        newHabit.completionType === 'interval' &&
                        <>
                            <label htmlFor="completionInterval">Target:</label>
                            <input 
                                type="number" 
                                name="completionInterval" 
                                style={{ width: '3.5rem' }}
                                onBlur={e => dispatchNewHabit( { formField: 'completionInterval', value: +e.target.value })}
                            />
                        </>
                    }
                </section>
            </p>

            <p className={`${base}__field--date`}>
                <label htmlFor="">
                    Track from/until
                </label>
                <section className="field__group">
                    <section>
                        <label htmlFor="startDate">Start</label>
                        <input 
                            type="date" 
                            name="startDate" 
                            onChange={e => dispatchNewHabit({ formField: 'endDate', value: e.target.valueAsDate })}
                        />
                    </section>
                    <section>
                        <label htmlFor="endDate">End</label>
                        <input 
                            type="date" 
                            name="endDate"
                            onChange={e => dispatchNewHabit({ formField: 'endDate', value: e.target.valueAsDate })}
                        />
                    </section>
                </section>
            </p>
        </form>
    )
}

export default NewHabit