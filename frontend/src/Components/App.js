import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Homepage";
import Header from "./Header";
import Favorites from "./Favorites";
import SignIn from "./SignIn";

function App() {
	return (
		<Router>
			<Header />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/favorites" element={<Favorites />} />
				<Route path="/signin" element={<SignIn />} />
			</Routes>
		</Router>
	);
}

export default App;
