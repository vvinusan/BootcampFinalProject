import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useEffect } from "react";
import { useState } from "react";
import { Context } from "./Context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const MovieList = () => {
	const { genreId } = useParams();

	const { choiceData, setChoiceData, userId, genres } = useContext(Context);

	const navigate = useNavigate();

	const [movies, setMovies] = useState([]);
	const [randomMovies, setRandomMovies] = useState([]);
	const [genreList, setGenreList] = useState([]);

	const handleChoose = (key, value) => {
		setChoiceData({
			...choiceData,
			[key]: value,
			userId: userId,
		});
		navigate("/confirmation");
	};

	useEffect(() => {
		fetch(
			`https://api.themoviedb.org/3/discover/movie?api_key=0552cedd4b9803ac1b9a12fe92f2d42b&language=en-US&include_adult=false&include_video=false&page=1&vote_average.gte=7&with_genres=${genreId}`
		)
			.then((res) => res.json())
			.then((data) => {
				setMovies(data.results);
				setRandomMovies(chooseFiveRandom(data.results));
				setGenreList(genres);
			})

			.catch((error) => {
				console.log(error);
			});
	}, [genreId]);

	const handleRefresh = () => {
		setRandomMovies(chooseFiveRandom(movies));
	};

	const chooseFiveRandom = (movies) => {
		let result = [];
		let moviesCopy = [...movies];
		for (let i = 0; i < 5; i++) {
			const randomIndex = Math.floor(Math.random() * moviesCopy.length);
			result.push(moviesCopy[randomIndex]);
			moviesCopy.splice(randomIndex, 1);
		}
		return result;
	};

	const genreObj = genres.filter((genre) => {
		return genre.id === Number(genreId);
	});

	const newFive = movies.length > 0 ? chooseFiveRandom(movies) : [];

	return (
		<Wrapper>
			{genreObj.length > 0 && <GenreTitle>{genreObj[0].name}</GenreTitle>}
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
										handleChoose(
											"movieId",
											event.target.value
										)
									}
								>
									Select Recipe
								</Select>
							</SubContainer>
						);
					})}
			</MainContainer>
			<RefreshBtn onClick={handleRefresh}>Refresh Choices</RefreshBtn>
		</Wrapper>
	);
};

export default MovieList;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const RefreshBtn = styled.button`
	margin-top: 5px;
	width: 300px;
`;

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

const GenreTitle = styled.div`
	font-weight: 900;
	font-size: 25px;
`;
const Title = styled.div``;

const Rating = styled.div``;

const Overview = styled.div``;

const Select = styled.button``;
