import React from "react";
import { useContext } from "react";
import { Context } from "./Context";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";

const Confirmation = () => {
	const { choiceData, setChoiceData } = useContext(Context);

	const [movie, setMovie] = useState([]);

	const [recipe, setRecipe] = useState([]);

	const navigate = useNavigate();

	useEffect(() => {
		fetch(
			`https://api.themoviedb.org/3/movie/${choiceData.movieId}?api_key=0552cedd4b9803ac1b9a12fe92f2d42b&language=en-US`
		)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				// setMovie(data);
			})

			.catch((error) => {
				console.log(error);
			});

		fetch(
			`https://api.spoonacular.com/recipes/${choiceData.recipeId}/information?apiKey=a9f069e813f44ed38e79a7ddd1dc115b`
		)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				// setRecipe(data);
			})

			.catch((error) => {
				console.log(error);
			});
	}, []);

	const handleSave = () => {
		//POST
		// navigate("/favorites");
		setChoiceData({});
	};

	return (
		<MainCont>
			confirmation
			{/* <Title>{recipe.title}</Title>
			<Title>{movie.title}</Title> */}
			{/* Save only resets choiceData for now */}
			<SaveBtn onClick={handleSave}>Save to Favorites</SaveBtn>
		</MainCont>
	);
};

export default Confirmation;

const MainCont = styled.div`
	display: flex;
	flex-direction: column;
`;

const Title = styled.div``;

const SaveBtn = styled.button``;
