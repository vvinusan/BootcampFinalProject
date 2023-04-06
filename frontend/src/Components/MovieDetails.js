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

	let voteAvg = movie.vote_average;
	let roundedVoteAvg = Math.round(voteAvg * 100) / 100;

	return (
		<MainCont>
			<BgImg
				src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
			/>
			<SubCont>
				<Img
					src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
					alt={movie.title}
				/>
				<DetailsCont>
					<Title>{movie.title}</Title>
					<Tagline>-{movie.tagline}</Tagline>
					<Info>{movie.release_date}</Info>
					<Info>{movie.runtime} minutes </Info>
					<Info>{roundedVoteAvg}/10</Info>
					<Info>{movie.overview}</Info>
				</DetailsCont>
			</SubCont>
		</MainCont>
	);
};

export default MovieDetails;

const MainCont = styled.div`
	background-image: url(movie.);
`;

const SubCont = styled.div`
	display: flex;
	/* justify-content: center; */
`;
const DetailsCont = styled.div`
	color: white;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	background-color: rgba(0, 0, 0, 0.4);
	height: 400px;
	margin: 50px 0;
	padding: 10px 25px;
`;

const Title = styled.div`
	font-size: 40px;
	align-self: center;
	font-weight: 900;
`;

const Info = styled.div``;

const Tagline = styled.div`
	font-style: italic;
`;

const Img = styled.img`
	height: 450px;
	margin: 25px 25px;
`;

const BgImg = styled.img`
	/* height: 100vh; */
	width: 98vw;
	position: absolute;
	z-index: -1;
	opacity: 0.5;
	filter: brightness(75%);
`;
