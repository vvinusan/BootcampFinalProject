import React, { useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";

const MovieTest = () => {
	const [genres, setGenres] = useState([]);

	// const ingredientHandler = (event) => {
	// 	setIngredients(event.target.value);
	// };
	// console.log(ingredients);

	useEffect(() => {
		fetch(
			`
			https://api.themoviedb.org/3/genre/movie/list?api_key=0552cedd4b9803ac1b9a12fe92f2d42b&language=en-US`
		)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setGenres(data.genres);
			})

			.catch((error) => {
				console.log(error);
			});
	}, []);

	// const chooseFiveRandom = array => {
	// 	let result = [];
	// 	let arrayCopy = [...array];
	// 	for (let i = 0; i < 5; i++) {
	// 	  const randomIndex = Math.floor(Math.random() * arrayCopy.length);
	// 	  result.push(arrayCopy[randomIndex]);
	// 	  arrayCopy.splice(randomIndex, 1);
	// 	}
	// 	return result;
	//   };

	/* <MoviesLink to={`/recipedetails/${recipe.id}`}> */

	// console.log(result);
	console.log(genres);
	return (
		<Wrapper>
			{genres.map((genre) => {
				return <GenreCont key={genre.id}>{genre.name}</GenreCont>;
			})}
		</Wrapper>
	);
};

export default MovieTest;

const Wrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
`;

const GenreCont = styled.div`
	font-family: "nimbus-sans", sans-serif;
	padding: 5px 10px;
	font-size: 20px;
	font-weight: 900;
	border: 2px solid red;
	border-radius: 5px;
	height: 35px;
	width: auto;
	margin: 5px;
	background-color: darkred;
`;
