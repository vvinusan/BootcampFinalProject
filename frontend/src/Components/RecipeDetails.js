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
				console.log(data);
				setRecipe(data);
				setInstruct(data.analyzedInstructions[0].steps);
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
					<Heading>
						<MainTitle>{recipe.title}</MainTitle>{" "}
						<InstructCont>
							{instruct.map((step) => {
								return (
									<Step key={step.number}>
										{step.number}. {step.step}
									</Step>
								);
							})}
						</InstructCont>
					</Heading>
					<SubCont>
						<Img src={recipe.image} alt="image of dish" />
						<Aside>
							<MiscInfo>
								<Title>
									Preparatio Time: {recipe.readyInMinutes}{" "}
									minutes
								</Title>
								<Title>
									Number of Servings: {recipe.servings}
								</Title>
								{!recipe.dairyFree &&
								!recipe.glutenFree &&
								!recipe.vegetarian &&
								!recipe.vegan ? (
									<></>
								) : (
									<DietInfo>
										<Title>Dietary Constraints</Title>
										<Info>
											{recipe.dairyFree && (
												<SubInfo>• Dairy Free</SubInfo>
											)}
										</Info>
										<Info>
											{recipe.glutenFree && (
												<SubInfo>• Gluten Free</SubInfo>
											)}
										</Info>
										<Info>
											{recipe.vegetarian && (
												<SubInfo>• Vegetarian</SubInfo>
											)}
										</Info>
										<Info>
											{recipe.vegan && (
												<SubInfo>• Vegan</SubInfo>
											)}
										</Info>
									</DietInfo>
								)}
							</MiscInfo>
							<IngredCont>
								<Title>Ingredients</Title>
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
	/* flex-direction: column; */
	/* align-items: center; */
	padding: 15px;
	/* height: 72vh; */
	background-image: linear-gradient(to top, #edcba9, white);
`;

const MainTitle = styled.div`
	color: white;
	padding: 10px 15px;
	border-radius: 5px;
	border: 10px solid #628196;
	width: 500px;
	background-color: #284455;
	text-align: center;
	font-size: 20px;
	font-weight: 900;
	margin: 25px;
	text-shadow: 0px 0px 2px #284455, 0px 0px 15px teal;
`;

const InstructCont = styled.div`
	color: #284455;
	font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
	display: flex;
	flex-direction: column;
	border-radius: 15px;
	padding: 15px;
	/* width: 70%; */
	font-size: 18px;
	background-image: linear-gradient(to bottom, #e4b485, #f1d7bd);
	text-shadow: 0px 0px 2px white, 0px 0px 15px white;
`;

const SubCont = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 30%;
`;

// const Steps = styled.div`
// 	margin: 10px;
// `;

const Step = styled.div`
	margin: 10px;
`;

const Title = styled.div`
	font-weight: 900;
`;

const Info = styled.div`
	margin-left: 10px;
`;

const SubInfo = styled.span``;

const Aside = styled.div`
	/* width: 25%; */
	padding: 15px;
	margin: 15px;
	font-size: 15px;
	border-radius: 15px;
	background-color: #628196;
	display: flex;
	flex-direction: column;
`;

const MiscInfo = styled.div`
	/* width: 20%; */
	padding: 10px;
	display: flex;
	color: white;
	flex-direction: column;
	background-color: #284455;
	border-radius: 15px;
	margin-bottom: 25px;
	font-style: italic;
	font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
`;

const DietInfo = styled.div`
	display: flex;

	flex-direction: column;
`;

const IngredCont = styled.div`
	/* width: 20%; */
	padding: 10px;
	border-radius: 15px;
	display: flex;
	flex-direction: column;
	background-color: darkred;
	color: white;
	font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
`;

const Ingred = styled.div`
	margin-left: 10px;
`;

const Img = styled.img`
	height: 175px;
	border-radius: 5px;
	border: 10px solid darkred;
`;

const Heading = styled.div`
	display: flex;
	flex-direction: column;
	/* justify-content: space-between; */
	align-items: center;
	width: 70%;
`;
