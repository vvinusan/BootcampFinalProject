import styled from "styled-components";
import React from "react";
import { Link } from "react-router-dom";

const RecipeList = ({ recipeList }) => {
	return (
		<MainContainer>
			{recipeList.map((recipe) => {
				return (
					<RecipeCont key={recipe.id}>
						<DetailsLink to={`/recipedetails/${recipe.id}`}>
							<Title>{recipe.title}</Title>
							<Img src={recipe.image} />
						</DetailsLink>
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

const DetailsLink = styled(Link)`
	color: black;
	&:visited {
		color: black;
	}
`;

const Img = styled.img`
	height: 150px;
	width: auto;
`;
