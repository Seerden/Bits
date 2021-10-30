import HabitToggleInstance from "components/HabitInstance/HabitToggleInstance";
import NewHabit from "components/NewHabit/NewHabit";
import Timescale from "components/Timescale/Timescale";
import "./App.scss";

const App = (props) => {
    return (
        <div className="App">
            {/* <Timescale /> */}
            <NewHabit />
            <HabitToggleInstance startsChecked={true} date={new Date()} habitId={'1'} index={0} />
        </div>
    )
};

export default App