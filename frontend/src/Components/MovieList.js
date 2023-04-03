import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useEffect } from "react";
import { useState } from "react";
// import { Link } from "react-router-dom";
import { Context } from "./Context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const MovieList = () => {
	const { genreId } = useParams();
	console.log(genreId);
	const { choiceData, setChoiceData, userId, setUserId } =
		useContext(Context);

	const [formData, setFormData] = useState({}); //TEST tbr with choiceData
	const navigate = useNavigate();

	const [movies, setMovies] = useState([]);

	const handleChoose = (key, value) => {
		setFormData({
			...formData,
			[key]: value,
			userId: userId,
		});
		navigate("/confirmation");
	};

	console.log(formData);

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

	const newFive = movies.length > 0 ? chooseFiveRandom() : [];

	console.log(newFive);
	return (
		<MainContainer>
			{newFive.length !== 0 &&
				newFive.map((movie) => {
					return (
						<SubContainer key={movie.id}>
							<Title>{movie.title}</Title>
							<Img
								src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
								alt={movie.title}
							/>
							<Overview>{movie.overview}</Overview>
							<Rating>{movie.vote_average}/10</Rating>
							<Select
								value={movie.id}
								onClick={(event) =>
									handleChoose("movieId", event.target.value)
								}
							>
								Select Recipe
							</Select>
						</SubContainer>
					);
				})}
		</MainContainer>
	);
};

export default MovieList;

const MainContainer = styled.div`
	display: flex;
	justify-content: space-evenly;
`;
const SubContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 5px;
	background-color: lightgray;
	margin: 5px;
`;

const Img = styled.img`
	width: 200px;
	height: auto;
`;
const Title = styled.div``;

const Rating = styled.div``;

const Overview = styled.div``;

const Select = styled.button``;

{
	/* <DetailsLink to={`/moviedetails/${movie.id}`}></DetailsLink>

const DetailsLink = styled(Link)`
	color: black;
	&:visited {
		color: black;
	}
`; */
}
