import HabitToggleInstance from "components/HabitInstance/HabitToggleInstance";
import Habits from "components/Habits/Habits";
import NewHabit from "components/NewHabit/NewHabit";
import "./App.scss";

const App = (props) => {
    return (
        <div className="App">
            <Habits />
            {/* <NewHabit /> */}
            {/* <HabitToggleInstance startsChecked={true} date={new Date()} habitId={'1'} index={0} /> */}
        </div>
    )
};

export default App