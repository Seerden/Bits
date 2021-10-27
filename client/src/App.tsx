import Login from "components/Auth/Login";
import NewHabit from "components/NewHabit/NewHabit";
import "./App.scss";

const App = (props) => {
    return (
        <div className="App">
            <NewHabit />
            <Login />
        </div>
    )
};

export default App