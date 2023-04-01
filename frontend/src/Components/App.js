import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Homepage";
import Header from "./Header";
import Favorites from "./Favorites";
import styled from "styled-components";
import LoginBtn from "./LoginBtn";
import LogoutBtn from "./LogoutBtn";
import RecipeDetails from "./RecipeDetails";

function App() {
	return (
		<Router>
			<HeadWrap>
				<Header />
				<LoginBtn />
				<LogoutBtn />
			</HeadWrap>

			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/favorites" element={<Favorites />} />
				<Route
					path="/recipedetails/:recipeId"
					element={<RecipeDetails />}
				/>
			</Routes>
		</Router>
	);
}

export default App;

const HeadWrap = styled.div`
	display: flex;
	justify-content: space-between;
`;
