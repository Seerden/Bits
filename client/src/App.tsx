import Login from "components/Auth/Login/Login";
import Private from "components/Auth/Private";
import Register from "components/Auth/Register/Register";
import HabitFilter from "components/Habits/HabitFilter/HabitFilter";
import Habits from "components/Habits/Habits";
import Home from "components/Home/Home";
import Header from "components/Layout/Header";
import NewHabit from "components/NewHabit/NewHabit";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.scss";

const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <Header />
                <Routes>
                    {/* @dev */}
                    <Route path="/filter" element={<HabitFilter />} />
                    <Route path="/" element={<Navigate replace to="home" />} />
                    <Route path="home" element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />

                    <Route path="habits">
                        <Route
                            index
                            element={
                                <Private>
                                    <Habits />
                                </Private>
                            }
                        />
                        <Route path="new" element={<NewHabit />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
