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
							Instructions
							{instruct.map((step) => {
								return (
									<Step key={step.number}>
										{step.number}. {step.step}
									</Step>
								);
							})}
						</InstructCont>
						<Aside>
							<MiscInfo>
								<Title>
									Preparatio Time: {recipe.readyInMinutes}{" "}
									minutes
								</Title>
								<Title>
									Number of Servings: {recipe.servings}
								</Title>
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
							</MiscInfo>
							<IngredCont>
								Ingredients
								{recipe.extendedIngredients.map(
									(ingredient) => {
										return (
											<Ingred key={ingredient.id}>
												• {ingredient.original}
											</Ingred>
										);
									}
								)}
							</IngredCont>
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
	margin: 15px;
`;

const InstructCont = styled.div`
	display: flex;
	flex-direction: column;
	width: 70%;
`;

const SubCont = styled.div`
	display: flex;
`;

const Steps = styled.div`
	margin: 10px;
`;

const Step = styled.div`
	margin: 10px;
`;

const Title = styled.div``;

const Info = styled.div``;

const SubInfo = styled.span``;

const Aside = styled.div`
	width: 20%;
	padding: 15px;
	margin: 15px;
	/* float: right; */

	background-color: lightgray;
	display: flex;
	flex-direction: column;
`;

const MiscInfo = styled.div`
	display: flex;
	flex-direction: column;
	background-color: white;
	margin-bottom: 25px;
	font-style: italic;
`;

const IngredCont = styled.div`
	display: flex;
	flex-direction: column;
	background-color: pink;
`;

const Ingred = styled.div``;
