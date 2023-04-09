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
				setMovie(data);
			})

			.catch((error) => {
				console.log(error);
			});
	}, [movieId]);

	let voteAvg = movie.vote_average;
	let roundedVoteAvg = Math.round(voteAvg * 100) / 100;

	return (
		<MainCont>
			<SubCont>
				<Img
					src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
					alt={movie.title}
				/>
				<DetailsCont>
					<Title>{movie.title}</Title>
					{movie.tagline && <Tagline>-{movie.tagline}</Tagline>}
					<SubInfo>
						<Info>Release Date: {movie.release_date}</Info>
						<Info>Runtime: {movie.runtime} minutes </Info>
						<Info>Avg Rating: {roundedVoteAvg}/10</Info>
					</SubInfo>
					<Overview>{movie.overview}</Overview>
				</DetailsCont>
			</SubCont>
		</MainCont>
	);
};

export default MovieDetails;

const MainCont = styled.div`
	background-image: linear-gradient(to top, darkred, white);
`;

const SubCont = styled.div`
	display: flex;
	/* justify-content: center; */
`;
const DetailsCont = styled.div`
	border-radius: 15px;

	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	/* background-color: rgba(0, 0, 0, 0.5); */
	background-image: linear-gradient(to bottom, #284455, #3e6074);
	/* height: 400px; */
	margin: 35px 25px 35px 0;
	padding: 0 5px;
`;

const Title = styled.div`
	align-self: center;
	font-weight: 100;

	font-size: 25px;

	padding: 15px;
	border-radius: 5px;
	font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
	background-color: darkred;
	text-shadow: 0px 0px 15px white;
	box-shadow: 0px 0px 5px white, 0px 0px 15px white;
	color: white;
	text-align: center;
`;

const Info = styled.div`
	border-bottom: 2px solid white;
	border-top: 2px solid white;
	padding: 5px;
	color: darkred;
`;

const SubInfo = styled.div`
	font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	font-weight: 100;
	font-size: 18px;
	text-shadow: 0px 0px 15px white;
`;

const Overview = styled.div`
	text-align: center;
	font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
	font-size: 20px;
	color: #edcba9;
`;

const Tagline = styled.div`
	color: white;
	font-style: italic;
	text-align: center;
	font-size: 20px;
	font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
`;

const Img = styled.img`
	height: 460px;
	margin: 25px 25px;
	border-radius: 5px;
	box-shadow: 0px 0px 5px white, 0px 0px 15px white;
`;
