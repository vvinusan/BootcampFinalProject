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

	console.log(choiceData);

	return (
		<MainCont>
			<MainTitle>Confirmation</MainTitle>
			<SubCont>
				<DivWrap>
					<RecipeCont>
						<RecipeTitle>
							{recipe.length !== 0 && recipe.title}
						</RecipeTitle>
						<RecipeImg src={recipe.image} alt={recipe.title} />
					</RecipeCont>
					<MovieCont>
						<MovieTitle>
							{movie.length !== 0 && movie.title}
						</MovieTitle>
						<MovieImg
							src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
							alt={movie.title}
						/>
					</MovieCont>
				</DivWrap>
				<Buttons>
					{isAuthenticated ? (
						<UserOptions>
							<SaveBtn onClick={handleSave}>
								Save to Favorites
							</SaveBtn>
							<FavoritesLink to={"/favorites"}>
								View Favorites
							</FavoritesLink>
						</UserOptions>
					) : (
						<NonUserOptions to={"/"}>
							Return to Homepage
						</NonUserOptions>
					)}
				</Buttons>
			</SubCont>
		</MainCont>
	);
};

export default Confirmation;

const UserOptions = styled.div`
	display: flex;
	flex-direction: column;
	padding: 10px;
`;
const NonUserOptions = styled(Link)`
	padding: 10px 30px;
	text-decoration: none;
	font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
	font-weight: 900;
	color: white;
	font-size: 20px;
	border-radius: 5px;
	margin: 5px 20px;
	box-sizing: border-box;
	background-color: #284455;
	&:hover {
		background-color: teal;
		text-shadow: 0px 0px 3px #284455, 0px 0px 30px #284455;
		color: white;
		transition: all 0.3s ease-in-out;
		scale: 1.5;
	}
`;

const MainCont = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 25px;
	background-image: linear-gradient(to top, #e4b485, white);
`;
const Buttons = styled.div``;

const SubCont = styled.div`
	display: flex;
	align-items: center;
	/* justify-content: center; */
`;

const MainTitle = styled.div`
	font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
	width: 200px;
	color: white;
	background-color: #628196;
	padding: 10px 20px;
	margin: 20px;
	border-radius: 5px;
	font-size: 25px;
	font-weight: 900;
	text-align: center;
	text-shadow: 0px 0px 2px #284455, 0px 0px 15px #284455;
`;

const MovieTitle = styled.div`
	font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
	text-decoration: none;
	color: white;
	text-align: center;
	width: 200px;
	padding: 10px 0;
	font-size: 20px; ;
`;

const RecipeTitle = styled.div`
	font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
	text-decoration: none;
	font-weight: 900;
	color: white;
	text-align: center;
	width: 200px;
	padding: 10px 0;
	font-size: 23px; ;
`;

const MovieImg = styled.img`
	width: 150px;

	height: auto;
	margin: 10px 0;
	box-shadow: 0px 0px 3px white, 0px 0px 15px white;
	border-radius: 5px;
`;

const RecipeImg = styled.img`
	width: 200px;
	height: auto;
	margin: 10px 0;
	box-shadow: 0px 0px 3px white, 0px 0px 15px white;
	border-radius: 5px;
`;

const DivWrap = styled.div`
	display: flex;
	align-items: center;
`;

const MovieCont = styled.div`
	text-decoration: none;
	display: flex;
	flex-direction: column;
	padding: 10px;
	width: 250px;
	height: 325px;
	align-items: center;
	justify-content: center;
	background-color: darkred;
	border-radius: 10px;
`;

const RecipeCont = styled.div`
	text-decoration: none;
	display: flex;
	flex-direction: column;
	margin-right: 30px;
	padding: 10px;
	width: 250px;
	height: 325px;
	align-items: center;
	justify-content: space-evenly;
	background-color: teal;
	border-radius: 10px;
`;

const SaveBtn = styled.button`
	border: none;
	padding: 10px 30px;
	text-decoration: none;
	font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
	font-weight: 900;
	color: white;
	font-size: 20px;
	border-radius: 5px;
	margin: 5px 20px;
	box-sizing: border-box;
	background-color: darkred;
	&:hover {
		background-color: red;
		text-shadow: 0px 0px 3px darkred, 0px 0px 30px darkred;
		color: white;
		transition: all 0.3s ease-in-out;
		scale: 1.2;
	}
`;

const FavoritesLink = styled(Link)`
	padding: 10px 30px;
	text-decoration: none;
	font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
	font-weight: 900;
	color: white;
	font-size: 20px;
	border-radius: 5px;
	margin: 5px 20px;
	box-sizing: border-box;
	background-color: #284455;
	&:hover {
		background-color: teal;
		text-shadow: 0px 0px 3px #284455, 0px 0px 30px #284455;
		color: white;
		transition: all 0.3s ease-in-out;
		scale: 1.2;
	}
`;
