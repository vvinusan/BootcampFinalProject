import React from "react";
import styled from "styled-components";
import { useState } from "react";
import RecipeList from "./RecipeList";

const RecipeSearch = () => {
	const [ingredients, setIngredients] = useState("");
	const [recipeList, setRecipeList] = useState([]);
	const [displayList, setDisplayList] = useState(false);
	const [instruct, setInstruct] = useState(true);

	const ingredientHandler = (event) => {
		setIngredients(event.target.value);
	};

	const handleInstruct = () => {
		setInstruct(true);
	};

	const getRecipes = () => {
		fetch(
			`https://api.spoonacular.com/recipes/findByIngredients?apiKey=a9f069e813f44ed38e79a7ddd1dc115b&ingredients=${ingredients}&number=12`
		)
			.then((res) => res.json())
			.then((data) => {
				setRecipeList(data);
				setDisplayList(true);
			})

			.catch((error) => {
				console.log(error);
			});

		setInstruct(false);
	};

	return (
		<Wrapper>
			<InputCont>
				<InstructBtn onClick={handleInstruct}>Instructions</InstructBtn>
				<Input
					type="text"
					value={ingredients}
					placeholder="Please input ingredients separated with a comma and no space"
					onChange={ingredientHandler}
				></Input>
				<SearchBtn onClick={getRecipes}>Search</SearchBtn>
			</InputCont>
			{instruct && (
				<InstructCont>
					<CompanyName>
						Welcome to <Meals>meals,</Meals>
						<Movies> MOVIES</Movies>
						<AndI> & I !!</AndI>
					</CompanyName>
					<Cont>
						<div>
							Time for dinner! Are you tired of eating out and
							spending on food? Want to actually make use of your
							gorceries?
						</div>
						{/* <div>Look no further than Meals, Movies & I.</div> */}

						<div>
							Get started by making yourself an account and/or
							signing in.
						</div>
						<div>
							List out the ingredients that you have on hand in
							our search bar to find recipes.
						</div>
						<div>
							Upon selecting a recipe, our site navigates you to
							choose a genre for a movie suggestion.
						</div>
						<div>
							You can view saved recipe-moive combos directly from
							your favorites page where you will have access to
							further detailes.
						</div>
						<div>The posibilities are endless!</div>
						<div>Get searching, get cooking and get watching!</div>
					</Cont>
				</InstructCont>
			)}

			<ResultsCont>
				{displayList && <RecipeList recipeList={recipeList} />}
			</ResultsCont>
		</Wrapper>
	);
};

export default RecipeSearch;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding-top: 20px;
	height: 100%;
	/* background-color: #f1d7bd; */
	background-image: linear-gradient(to top, #f1d7bd, white);
`;

const Input = styled.input`
	width: 500px;
	height: 20px;
	background-color: rgb(153, 236, 234, 1);
	height: 30px;
	border-radius: 5px;
	margin: 0 5px;
`;

const InputCont = styled.div`
	display: flex;
	padding-bottom: 20px;
	align-items: center;
`;

const SearchBtn = styled.button`
	outline: none;
	border: none;

	padding: 5px;
	font-size: 20px;
	width: 80px;

	color: white;
	background-color: darkred;
	border-radius: 5px;

	font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
	font-weight: 900;
	&:hover {
		color: white;
		transition: all 0.3s ease-in-out;
		background-color: red;
	}
`;

const InstructBtn = styled.button`
	outline: none;
	border: none;

	padding: 5px;
	font-size: 20px;
	width: 80px;

	color: white;
	background-color: darkred;
	border-radius: 5px;

	font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
	font-weight: 900;
	&:hover {
		color: white;
		transition: all 0.3s ease-in-out;
		background-color: red;
	}
`;

const ResultsCont = styled.div``;

const InstructCont = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const CompanyName = styled.div`
	font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
	font-weight: 900;
	font-size: 25px;
	text-decoration: none;
	&:visited {
		color: black;
	}
`;

const Meals = styled.span`
	font-style: italic;
	font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
	font-weight: 500;
	/* color: #253d5b; */
	/* color: teal; */
	color: #39dbd7;
`;

const Movies = styled.span`
	font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
	color: darkred;
`;

const AndI = styled.span``;

const Cont = styled.div`
	font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 60vh;
	justify-content: space-evenly;
	font-size: 20px;
	text-align: center;
`;
