import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./Context";

const MovieGenres = () => {
	const { genres } = useContext(Context);

	return (
		<Wrapper>
			{genres.map((genre) => {
				return (
					<GenreCont key={genre.id}>
						<MoviesLink
							key={genre.id}
							to={`/movielist/${genre.id}`}
						>
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
	background-image: linear-gradient(to top, #edcba9, white);
	height: 80vh;
`;

const GenreCont = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const MoviesLink = styled(Link)`
	font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
	padding: 10px;
	font-size: 20px;
	border-radius: 5px;
	width: 200px;
	text-align: center;
	margin: 25px 50px;
	text-shadow: 0px 0px 2px black, 0px 0px 15px black;
	background-color: #284455;
	text-decoration: none;
	color: #f1d7bd;
	&:visited {
		color: #f1d7bd;
	}
	&:hover {
		color: white;
		transition: all 0.3s ease-in-out;
		scale: 1.5;
		background-color: darkred;
		text-shadow: 0px 0px 2px red, 0px 0px 15px white;
	}
`;
