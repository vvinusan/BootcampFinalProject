import React from "react";
import { useContext } from "react";
import { Context } from "./Context";
import { useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Confirmation = () => {
	const { choiceData, setChoiceData } = useContext(Context);

	const { isAuthenticated } = useAuth0();

	const [movie, setMovie] = useState([]);

	const [recipe, setRecipe] = useState([]);

	useEffect(() => {
		fetch(
			`https://api.themoviedb.org/3/movie/${choiceData.movieId}?api_key=0552cedd4b9803ac1b9a12fe92f2d42b&language=en-US`
		)
			.then((res) => res.json())
			.then((data) => {
				setMovie(data);
			})

			.catch((error) => {
				console.log(error);
			});

		fetch(
			`https://api.spoonacular.com/recipes/${choiceData.recipeId}/information?apiKey=a9f069e813f44ed38e79a7ddd1dc115b`
		)
			.then((res) => res.json())
			.then((data) => {
				setRecipe(data);
			})

			.catch((error) => {
				console.log(error);
			});
	}, []);

	let modChoiceData = choiceData;

	modChoiceData.recipeTitle = recipe.title;
	modChoiceData.movieTitle = movie.title;
	modChoiceData.recipeImg = recipe.image;
	modChoiceData.movieImg = movie.poster_path;

	const handleSave = () => {
		fetch("/addFavorite", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(modChoiceData),
		});

		setChoiceData({});
	};

	return (
		<MainCont>
			confirmation
			<Title>{recipe.length !== 0 && recipe.title}</Title>
			<RecipeImg src={recipe.image} alt={recipe.title} />
			<Title>{movie.length !== 0 && movie.title}</Title>
			<MovieImg
				src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
				alt={movie.title}
			/>
			{isAuthenticated ? (
				<UserOptions>
					<SaveBtn onClick={handleSave}>Save to Favorites</SaveBtn>
					<FavoritesLink to={"/favorites"}>
						View Favorites
					</FavoritesLink>
				</UserOptions>
			) : (
				<NonUserOptions to={"/"}>Return to Homepage</NonUserOptions>
			)}
		</MainCont>
	);
};

export default Confirmation;

const UserOptions = styled.div`
	display: flex;
`;
const NonUserOptions = styled(Link)``;

const MainCont = styled.div`
	display: flex;
	flex-direction: column;
`;

const Title = styled.div``;

const MovieImg = styled.img`
	width: 200px;
	height: auto;
`;

const RecipeImg = styled.img`
	width: 200px;
	height: auto;
`;

const SaveBtn = styled.button``;

const FavoritesLink = styled(Link)``;
