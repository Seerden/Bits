import Login from "components/Auth/Login";
import Private from "components/Auth/Private";
import Register from "components/Auth/Register";
import Habits from "components/Habits/Habits";
import Header from "components/Layout/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";

const App = (props) => {
    return (
        <div className="App">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/habits" element={
                        <Private>
                            <Habits />
                        </Private>
                    } />
                </Routes>
            </BrowserRouter>
        </div>
    )
};

export default App