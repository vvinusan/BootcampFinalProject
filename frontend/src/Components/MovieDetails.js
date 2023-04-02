import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import { useEffect } from "react";

const MovieDetails = () => {
	const { movieId } = useParams();
	console.log(movieId);

	const [movie, setMovie] = useState([]);

	useEffect(() => {
		fetch(
			`https://api.themoviedb.org/3/movie/${movieId}?api_key=0552cedd4b9803ac1b9a12fe92f2d42b&language=en-US`
		)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setMovie(data);
			})

			.catch((error) => {
				console.log(error);
			});
	}, [movieId]);

	return <MainCont>movie details {movie.title}</MainCont>;
};

export default MovieDetails;

const MainCont = styled.div``;
