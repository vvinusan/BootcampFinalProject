import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

const RecipeDetails = () => {
	const { recipeId } = useParams();

	console.log(recipeId);
	const [recipe, setRecipe] = useState([]);

	useEffect(() => {
		fetch(
			`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=a9f069e813f44ed38e79a7ddd1dc115b`
		)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setRecipe(data);
			})

			.catch((error) => {
				console.log(error);
			});
	}, [recipeId]);

	console.log(recipe);

	return (
		<>
			{recipe.length !== 0 ? (
				<MainCont>
					<Title>{recipe.title}</Title>
					<Title>
						Preparatio Time: {recipe.readyInMinutes} minutes
					</Title>
					<Title>Number of Servings: {recipe.servings}</Title>
					<Title>Dietary Constraints</Title>
					<Info>
						{recipe.dairyFree && <SubInfo>Dairy Free</SubInfo>}
					</Info>
					<Info>
						{recipe.glutenFree && <SubInfo>Gluten Free</SubInfo>}
					</Info>
					<Info>
						{recipe.vegetarian && <SubInfo>Vegetarian</SubInfo>}
					</Info>
					<Info>{recipe.vegan && <SubInfo>Vegan</SubInfo>}</Info>
				</MainCont>
			) : (
				<Title>Loading...</Title>
			)}
		</>
	);
};

export default RecipeDetails;

const MainCont = styled.div`
	display: flex;
	flex-direction: column;
`;

const Title = styled.div``;

const Info = styled.div``;

const SubInfo = styled.span``;
