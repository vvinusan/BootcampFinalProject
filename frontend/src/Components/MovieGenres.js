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
