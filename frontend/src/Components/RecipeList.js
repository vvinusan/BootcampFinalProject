import styled from "styled-components";
import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const RecipeList = ({ recipeList }) => {
	const [showInfo, setShowInfo] = useState(false);

	const handleShowInfo = () => {
		setShowInfo(true);
	};

	return (
		<MainContainer>
			{recipeList.map((recipe) => {
				return (
					<RecipeCont key={recipe.id}>
						<Title>{recipe.title}</Title>
						<Img src={recipe.image} />
						<IngredCont>
							<div>Missing Ingreident</div>
							{recipe.missedIngredients.map((missIng) => {
								return (
									<Ingred key={missIng.id}>
										{missIng.original}
									</Ingred>
								);
							})}
							<div>Avaiable Ingreident</div>
							{recipe.usedIngredients.map((avaiIng) => {
								return (
									<Ingred key={avaiIng.id}>
										{avaiIng.original}
									</Ingred>
								);
							})}
						</IngredCont>
						<Select>Select Recipe</Select>
					</RecipeCont>
				);
			})}
		</MainContainer>
	);
};

export default RecipeList;

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

{
	/* <DetailsLink to={`/recipedetails/${recipe.id}`}>
							Select Recipe
						</DetailsLink>

const DetailsLink = styled(Link)`
	color: black;
	&:visited {
		color: black;
	}
`; */
}

const Img = styled.img`
	height: 150px;
	width: auto;
`;

const Ingred = styled.div``;

const IngredCont = styled.div`
	display: flex;
	flex-direction: column;
`;

const Select = styled.button``;
