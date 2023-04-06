import React, { useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./Context";

const MovieGenres = () => {
	// const [genres, setGenres] = useState([]);
	const { choiceData, setChoiceData, genres } = useContext(Context);

	// useEffect(() => {
	// 	fetch(
	// 		`
	// 		https://api.themoviedb.org/3/genre/movie/list?api_key=0552cedd4b9803ac1b9a12fe92f2d42b&language=en-US`
	// 	)
	// 		.then((res) => res.json())
	// 		.then((data) => {
	// 			console.log(data.genres);
	// 			setGenres(data.genres);
	// 		})

	// 		.catch((error) => {
	// 			console.log(error);
	// 		});
	// }, []);

	console.log(genres);
	console.log(choiceData);
	return (
		<Wrapper>
			{genres.map((genre) => {
				return (
					<GenreCont key={genre.id}>
						<MoviesLink to={`/movielist/${genre.id}`}>
							{genre.name}
						</MoviesLink>
					</GenreCont>
				);
			})}
		</Wrapper>
	);
};

export default MovieGenres;

const Wrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	background-color: #f7d1dd;
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

const MoviesLink = styled(Link)`
	text-decoration: none;
	color: black;
	&:visited {
		color: black;
	}
	&:hover {
		color: white;
	}
`;
