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
					<GenreCont>
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
	background-image: linear-gradient(to top, #f1d7bd, white);
	/* margin: 30px 2px; */
	/* padding: ; */
	height: 80vh;
`;

const GenreCont = styled.div`
	display: flex;
	/* flex-wrap: wrap; */
	justify-content: center;
	align-items: center;
`;

const MoviesLink = styled(Link)`
	font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
	padding: 5px;
	font-size: 20px;

	/* font-weight: 900; */
	/* border: 2px solid red; */
	border-radius: 5px;
	width: 200px;
	height: 30px;
	text-align: center;
	margin: 25px 50px;
	background-color: darkred;
	text-decoration: none;
	color: #f1d7bd;
	&:visited {
		color: #f1d7bd;
	}
	&:hover {
		color: white;
		transition: all 0.3s ease-in-out;
		scale: 1.3;
		background-color: red;
	}
`;
