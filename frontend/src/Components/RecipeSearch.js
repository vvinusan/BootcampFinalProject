import React from "react";
import styled from "styled-components";
import { useState } from "react";
import RecipeList from "./RecipeList";

const RecipeSearch = () => {
	const [ingredients, setIngredients] = useState("");
	const [recipeList, setRecipeList] = useState([]);

	const ingredientHandler = (event) => {
		setIngredients(event.target.value);
	};

	const getRecipes = () => {
		fetch(
			`https://api.spoonacular.com/recipes/findByIngredients?apiKey=a9f069e813f44ed38e79a7ddd1dc115b&ingredients=${ingredients}&number=5`
		)
			.then((res) => res.json())
			.then((data) => {
				setRecipeList(data);
			})

			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<Form>
			<InputCont>
				<Input
					type="text"
					value={ingredients}
					placeholder="Please input ingredients separated with a comma and no space"
					onChange={ingredientHandler}
				></Input>
				<SearchBtn onClick={getRecipes}>Search</SearchBtn>
			</InputCont>
			<ResultsCont>
				{recipeList.length !== 0 && (
					<RecipeList recipeList={recipeList} />
				)}
			</ResultsCont>
		</Form>
	);
};

export default RecipeSearch;

const Form = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 20px;
	background-color: #f7d1dd;
`;

const Input = styled.input`
	width: 500px;
	height: 20px;
	background-color: lightblue;
`;

const InputCont = styled.div`
	display: flex;
	padding-bottom: 20px;
`;

const SearchBtn = styled.button``;

const ResultsCont = styled.div``;
