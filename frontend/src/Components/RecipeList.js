import styled from "styled-components";
import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Context } from "./Context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const RecipeList = ({ recipeList }) => {
	const { choiceData, setChoiceData, userId, setUserId } =
		useContext(Context);

	const [formData, setFormData] = useState({}); //TEST tbr with choiceData
	const navigate = useNavigate();

	//upon clicking the Select recipe button,
	// the handler should also include a use nagivate that brings to MovieGenre,
	//need to make it a seperate page with its own Route

	const handleChoose = (key, value) => {
		setFormData({
			...formData,
			[key]: value,
		});
	};

	console.log(formData);
	return (
		<MainContainer>
			{recipeList.map((recipe) => {
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
						<UserId>{userId}</UserId>
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
			})}
		</MainContainer>
	);
};

export default RecipeList;

const UserId = styled.p``;

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

const MissIngred = styled.div`
	color: red;
`;

const AvaiIngred = styled.div``;

const IngredCont = styled.div`
	display: flex;
	flex-direction: column;
`;

const Select = styled.button``;
