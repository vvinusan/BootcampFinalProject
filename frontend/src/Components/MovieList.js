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
			{genreObj.length > 0 && (
				<HeadingCont>
					<GenreTitle>{genreObj[0].name}</GenreTitle>
					<RefreshBtn onClick={handleRefresh}>
						Refresh Choices
					</RefreshBtn>
				</HeadingCont>
			)}
			<MainContainer>
				{newFive.length !== 0 &&
					newFive.map((movie) => {
						return (
							<SubContainer key={movie.id}>
								<TitleCont>
									<Title>{movie.title}</Title>
								</TitleCont>
								<Img
									src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
									alt={movie.title}
								/>

								<Rating>{movie.vote_average}/10</Rating>
								<Overview>{movie.overview}</Overview>
								<Select
									value={movie.id}
									onClick={(event) =>
										handleChoose(
											"movieId",
											event.target.value
										)
									}
								>
									Select Movie
								</Select>
							</SubContainer>
						);
					})}
			</MainContainer>
		</Wrapper>
	);
};

export default MovieList;

const HeadingCont = styled.div`
	display: flex;
`;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	background-image: linear-gradient(to top, #edcba9, white);
`;

const RefreshBtn = styled.button`
	margin-top: 5px;
	width: 300px;
`;

const MainContainer = styled.div`
	display: flex;
	justify-content: space-evenly;
	/* width: 500px; */
`;
const SubContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	/* justify-content: space-around; */
	padding: 15px 8px;
	background-color: #284455;
	margin: 10px;
	width: 225px;
	border-radius: 5px;
`;

const Img = styled.img`
	width: 200px;
	height: auto;
	margin: 10px 0;
	box-shadow: 0px 0px 2px white, 0px 0px 10px white;
	border-radius: 5px;
`;

const GenreTitle = styled.div`
	font-weight: 900;
	font-size: 25px;
`;
const Title = styled.div`
	font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;

	padding: 5px;
	font-size: 20px;
	color: #f1d7bd;
	background-color: darkred;
	border-radius: 5px;
	text-align: center;
	width: 190px;
	/* height: 75px; */
	/* &:hover {
		text-shadow: 0px 0px 2px red, 0px 0px 15px white;
		transition: all 0.2s ease-in-out;
	} */
`;

const TitleCont = styled.div`
	height: 90px;
	background-color: darkred;
	border-radius: 5px;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
	margin-bottom: 5px;
	box-shadow: 0px 0px 5px #3e6074;
	&:hover {
		text-shadow: 0px 0px 2px red, 0px 0px 15px white;
		transition: all 0.2s ease-in-out;
	}
`;

const Rating = styled.div`
	font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
	font-size: 25px;
	color: white;
`;

const Overview = styled.div`
	color: #f1d7bd;
	font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
	width: 190px;
	text-align: center;
`;

const Select = styled.button``;
