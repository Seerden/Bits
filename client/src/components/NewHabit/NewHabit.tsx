import './NewHabit.scss';

const NewHabit = (props) => {
    const base = "NewHabit";

    return (
        <div className={`${base}`}>
            <header>
                New Habit
            </header>
            <form>
                <p>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="Name" id="" />
                </p>

                <p>
                    <label htmlFor="description">Description</label>
                    <textarea name="" id="" placeholder="Optional"></textarea>
                </p>

                <p>
                    <label htmlFor="frequency">Frequency</label>
                    <select name="frequency" id="">
                        <option value="daily" selected>Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                    </select>
                </p>

                <p>
                    <label htmlFor="type">Type</label>
                    <select name="type" id="">
                        <option value="boolean">Completed/not completed</option>
                        <option value="range">Range</option>
                    </select>
                </p>
            </form>

        </div>
    )
}

export default NewHabit