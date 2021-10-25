import CompactHabit from "components/CompactHabit/CompactHabit";
import HabitRangeInstance from "components/HabitInstance/HabitRangeInstance";
import "./App.scss";

const App = (props) => {
    return (
        <div className="App">
            {/* <NewHabit/> */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: "center",
                margin: "0 auto",
                marginTop: "10rem",
                padding: "5rem",
                outline: "2px solid red"
            }}>
                <CompactHabit {...{name: 'TestHabit', completion: [[true, false], [false, false]]}} />
            </div>
            <HabitRangeInstance intervalMax={1200}/>
        </div>
    )
};

export default App