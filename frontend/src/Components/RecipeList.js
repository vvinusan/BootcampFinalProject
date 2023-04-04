import styled from "styled-components";
import React from "react";
import { Context } from "./Context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const RecipeList = ({ recipeList }) => {
	const { choiceData, setChoiceData } = useContext(Context);

	const navigate = useNavigate();

	console.log(choiceData);

	const handleChoose = (key, value) => {
		// setChoiceData({
		// 	...choiceData,
		// 	[key]: value,
		// });
		setChoiceData({
			[key]: value,
		});
		navigate("/genres");
	};

	console.log(choiceData);
	return (
		<MainContainer>
			{recipeList.length !== 0 ? (
				recipeList.map((recipe) => {
					return (
						<RecipeCont key={recipe.id}>
							<Title>{recipe.title}</Title>
							<Img src={recipe.image} alt="image of dish" />
							<IngredCont>
								<div>Missing Ingredient</div>
								{recipe.missedIngredients.map((missIng) => {
									return (
										<MissIngred key={missIng.id}>
											{missIng.original}
										</MissIngred>
									);
								})}
								<div>Available Ingredient</div>
								{recipe.usedIngredients.map((avaiIng) => {
									return (
										<AvaiIngred key={avaiIng.id}>
											{avaiIng.original}
										</AvaiIngred>
									);
								})}
							</IngredCont>

							<Select
								value={recipe.id}
								onClick={(event) =>
									handleChoose("recipeId", event.target.value)
								}
							>
								Select Recipe
							</Select>
						</RecipeCont>
					);
				})
			) : (
				<NoResults>
					There are no recipes for the requested ingredients. Please
					verify spelling or query again{" "}
				</NoResults>
			)}
		</MainContainer>
	);
};

export default RecipeList;

const NoResults = styled.div``;

const MainContainer = styled.div`
	display: flex;
	justify-content: space-evenly;
`;
const RecipeCont = styled.div`
	display: flex;
	flex-direction: column;
	padding: 5px;
	background-color: lightgray;
	margin: 5px;
`;

const Title = styled.div``;

const Img = styled.img`
	height: 150px;
	width: auto;
`;

const MissIngred = styled.div`
	color: red;
`;

const AvaiIngred = styled.div``;

const IngredCont = styled.div`
	display: flex;
	flex-direction: column;
`;

const Select = styled.button``;
