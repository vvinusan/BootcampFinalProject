import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
// import { useState } from "react";

const RecipeDetails = () => {
	const { recipeId } = useParams();

	console.log(recipeId);
	// const [recipe, setRecipe] = useState;

	useEffect(() => {
		fetch(
			`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=a9f069e813f44ed38e79a7ddd1dc115b`
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

	return <MainCont>recipe details</MainCont>;
};

export default RecipeDetails;

const MainCont = styled.div``;
