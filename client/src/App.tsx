import NewHabit from "components/NewHabit/NewHabit";
import Timescale from "components/Timescale/Timescale";
import "./App.scss";

const App = (props) => {
    return (
        <div className="App">
            {/* <Timescale /> */}
            <NewHabit />
        </div>
    )
};

export default App