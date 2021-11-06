import LabeledInput from './LabeledInput';
import './NewHabit.scss';
import { useNewHabit } from './useNewHabit';

// @todo: implement field validators in the form, instead of checking for validity in the submission handlers
// not required for MVP, so leave it as is for the time being

const NewHabit = () => {
    const base = "NewHabit";
    const [newHabit, dispatchNewHabit, handleSubmitNewHabit] = useNewHabit();

    return (
        <form
            className={`${base}`}
            onSubmit={handleSubmitNewHabit}
        >
            <p className={`${base}__field`}>
                <label htmlFor="name">
                    Name
                </label>
                <section className="field__group">
                    <input
                        type="text"
                        name="name"
                        onBlur={e => dispatchNewHabit({ formField: 'habitName', value: e.target.value })}
                    />
                </section>
            </p>

            <LabeledInput
                htmlFor="description"
                label={"Describe your habit"}
                type="text"
                placeholder="Optional"
                onBlur={e => dispatchNewHabit({ formField: 'description', value: e.target.value })}
            />

            <p className={`${base}__field--frequency`}>
                <label htmlFor="">Complete...</label>
                <section>
                    <input
                        type="number"
                        name="frequency"
                    />
                    <span>
                        times per
                    </span>
                    <select>
                        {
                            ['day', 'week', 'month', 'year'].map(t =>
                                <option value={t}>{t}</option>
                            )
                        }
                    </select>
                </section>
            </p>

            <p className={`${base}__field`}>
                <label
                    htmlFor="type"
                >
                    What type of habit?
                </label>
                <section className="field__group">
                    <select
                        name="type"
                        onChange={e => dispatchNewHabit({
                            formField: 'completionType',
                            value: e.target.value
                        })}
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
                        <LabeledInput
                            htmlFor="completionInterval"
                            label="Target"
                            type="number"
                            style={{ width: '3.5rem' }}
                            onBlur={e => dispatchNewHabit({
                                formField: 'completionInterval',
                                value: +e.target.value
                            })}
                        />
                    }
                </section>
            </p>

            <p className={`${base}__field--date`}>
                <label htmlFor="">
                    Track from/until
                </label>
                <section className="field__group">
                    <LabeledInput
                        htmlFor='startDate'
                        label={'Start'}
                        type='date'
                        onChange={e => dispatchNewHabit({
                            formField: 'endDate',
                            value: e.target.valueAsDate
                        })}
                    />
                    <LabeledInput
                        htmlFor='endDate'
                        type='text'
                        label={'End'}
                        onChange={e => dispatchNewHabit({
                            formField: 'endDate',
                            value: e.target.valueAsDate
                        })}
                    />
                </section>
            </p>

            <input
                type="submit"
                value="Save habit"
            />
        </form>
    )
}

export default NewHabit;