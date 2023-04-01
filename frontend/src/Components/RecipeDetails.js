import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
// import { useState } from "react";

const RecipeDetails = () => {
	const { recipeId } = useParams;

	console.log(recipeId);
	// const [recipe, setRecipe] = useState;

	// const getRecipebyId = () => {
	// 	fetch()
	// 		// `https://api.spoonacular.com/recipes/findByIngredients?apiKey=a9f069e813f44ed38e79a7ddd1dc115b&ingredients=${ingredients}&number=5`
	// 		.then((res) => res.json())
	// 		.then((data) => {
	// 			console.log(data);
	// 			// setRecipe(data);
	// 		})

	// 		.catch((error) => {
	// 			console.log(error);
	// 		});
	// };

	return <MainCont>recipe details</MainCont>;
};

export default RecipeDetails;

const MainCont = styled.div``;
