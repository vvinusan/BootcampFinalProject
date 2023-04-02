import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useEffect } from "react";
import { useState } from "react";

const MovieList = () => {
	const { genreId } = useParams();
	console.log(genreId);

	const [movies, setMovies] = useState([]);

	useEffect(() => {
		fetch(
			`https://api.themoviedb.org/3/discover/movie?api_key=0552cedd4b9803ac1b9a12fe92f2d42b&language=en-US&include_adult=false&include_video=false&page=1&vote_average.gte=7&with_genres=${genreId}`
		)
			.then((res) => res.json())
			.then((data) => {
				setMovies(data.results);
			})

			.catch((error) => {
				console.log(error);
			});
	}, [genreId]);

	const chooseFiveRandom = () => {
		let result = [];
		let moviesCopy = [...movies];
		for (let i = 0; i < 5; i++) {
			const randomIndex = Math.floor(Math.random() * moviesCopy.length);
			result.push(moviesCopy[randomIndex]);
			moviesCopy.splice(randomIndex, 1);
		}
		return result;
	};

	const newFive = chooseFiveRandom();

	console.log(newFive);

	return <Wrapper>movie list</Wrapper>;
};

export default MovieList;

const Wrapper = styled.div``;
