import React from "react";
import styled from "styled-components";
import { useEffect } from "react";
import { useState } from "react";

const RecipePreview = ({ recipeId }) => {
	const [recipe, setRecipe] = useState([]);

	useEffect(() => {
		fetch(
			`https://api.spoonacular.com/recipes/${recipeId.recipeId}/information?apiKey=a9f069e813f44ed38e79a7ddd1dc115b`
		)
			.then((res) => res.json())
			.then((data) => {
				setRecipe(data);
			})

			.catch((error) => {
				console.log(error);
			});
	}, [recipeId]);

	return (
		<>
			{recipe.length !== 0 ? (
				<MainCont>
					<MainTitle>{recipe.title}</MainTitle>
					<InfoCont>
						<Title>
							Preparatio Time: {recipe.readyInMinutes} minutes
						</Title>
						<Title>Number of Servings: {recipe.servings}</Title>
						<Title>Dietary Constraints</Title>
						<Info>
							{recipe.dairyFree && <SubInfo> Dairy Free</SubInfo>}
						</Info>
						<Info>
							{recipe.glutenFree && (
								<SubInfo>Gluten Free</SubInfo>
							)}
						</Info>
						<Info>
							{recipe.vegetarian && <SubInfo>Vegetarian</SubInfo>}
						</Info>
						<Info>{recipe.vegan && <SubInfo>Vegan</SubInfo>}</Info>
					</InfoCont>
				</MainCont>
			) : (
				<Title>Loading...</Title>
			)}
		</>
	);
};

export default RecipePreview;

const InfoCont = styled.div`
	border-radius: 10px;
	background-image: linear-gradient(to right, #e4b485, #edcba9);
	padding: 5px;
`;

const MainCont = styled.div`
	display: flex;
	flex-direction: column;
	font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;

	padding: 10px;
`;

const MainTitle = styled.div`
	color: white;
	background-color: #628196;
	padding: 5px;
	border-radius: 3px;
	font-size: 20px;
	font-weight: 900;
`;

const Title = styled.div`
	font-size: 15px;
	font-weight: 900;
`;

const Info = styled.div`
	font-size: 15px;
`;

const SubInfo = styled.span``;
