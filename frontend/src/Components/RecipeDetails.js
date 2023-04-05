import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

const RecipeDetails = () => {
	const { recipeId } = useParams();

	console.log(recipeId);
	const [recipe, setRecipe] = useState([]);

	const [instruct, setInstruct] = useState([]);

	useEffect(() => {
		fetch(
			`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=a9f069e813f44ed38e79a7ddd1dc115b`
		)
			.then((res) => res.json())
			.then((data) => {
				setRecipe(data);
				setInstruct(data.analyzedInstructions[0].steps);
			})

			.catch((error) => {
				console.log(error);
			});
	}, [recipeId]);

	console.log(recipe);
	console.log(instruct);

	return (
		<>
			{recipe.length !== 0 ? (
				<MainCont>
					<Title>{recipe.title}</Title>
					<SubCont>
						<InstructCont>
							<Title>
								{instruct.map((step) => {
									return (
										<div key={step.number}>{step.step}</div>
									);
								})}
							</Title>
						</InstructCont>
						<Aside>
							<Title>
								Preparatio Time: {recipe.readyInMinutes} minutes
							</Title>
							<Title>Number of Servings: {recipe.servings}</Title>
							<Title>Dietary Constraints</Title>
							<Info>
								{recipe.dairyFree && (
									<SubInfo>Dairy Free</SubInfo>
								)}
							</Info>
							<Info>
								{recipe.glutenFree && (
									<SubInfo>Gluten Free</SubInfo>
								)}
							</Info>
							<Info>
								{recipe.vegetarian && (
									<SubInfo>Vegetarian</SubInfo>
								)}
							</Info>
							<Info>
								{recipe.vegan && <SubInfo>Vegan</SubInfo>}
							</Info>
						</Aside>
					</SubCont>
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

const InstructCont = styled.div`
	display: flex;
	flex-direction: column;
	width: 60%;
`;

const SubCont = styled.div`
	display: flex;
`;

const Title = styled.div``;

const Info = styled.div``;

const SubInfo = styled.span``;

const Aside = styled.div`
	width: 30%;
	padding-left: 15px;
	margin-left: 15px;
	float: right;
	font-style: italic;
	background-color: lightgray;
	display: flex;
	flex-direction: column;
`;
