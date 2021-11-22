import Login from "components/Auth/Login/Login";
import Private from "components/Auth/Private";
import Register from "components/Auth/Register/Register";
import Habits from "components/Habits/Habits";
import Home from "components/Home/Home";
import Header from "components/Layout/Header";
import NewHabit from "components/NewHabit/NewHabit";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.scss";

const App = (props) => {
	return (
		<div className="App">
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path="/" element={<Navigate replace to="home" />} />
					<Route path="home" element={<Home />} />
					<Route path="login" element={<Login />} />
					<Route path="register" element={<Register />} />
					<Route
						path="newhabit"
						element={
							<div style={{ margin: "5rem" }}>
								<NewHabit />
							</div>
						}
					/>
					<Route
						path="habits"
						element={
							<Private>
								<Habits />
							</Private>
						}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
