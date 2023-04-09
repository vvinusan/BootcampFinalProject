import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Favorites = () => {
	const { user, isAuthenticated } = useAuth0();

	const [favorites, setFavorites] = useState([]);

	//Retrieve favorites
	useEffect(() => {
		fetch("/getFavorites")
			.then((res) => res.json())
			.then((data) => {
				setFavorites(data.data);
			});
	}, []);

	const handleUnsave = (event, id) => {
		fetch(`/deleteFavorite/${id}`, {
			method: "DELETE",
		})
			.then((res) => res.json())
			.then(() => {
				// Call the useEffect again after deleting the favorite
				fetch("/getFavorites")
					.then((res) => res.json())
					.then((data) => {
						setFavorites(data.data);
					});
			});
	};

	const currentUserFav = favorites.filter((genFavItem) => {
		return user && genFavItem.userId === user.sub;
	});

	return currentUserFav.length !== 0 ? (
		<MainContainer>
			Click on recipes or movies for further details
			{currentUserFav.map((favItem) => {
				return (
					<SubContainer key={favItem._id}>
						<DivWrap>
							<RecipeCont
								to={`/recipedetails/${favItem.recipeId}`}
							>
								<RecipeTitle>{favItem.recipeTitle}</RecipeTitle>
								<RecipeImg
									src={favItem.recipeImg}
									alt={favItem.recipeTitle}
								/>
							</RecipeCont>
							<MovieCont to={`/moviedetails/${favItem.movieId}`}>
								<MovieTitle>{favItem.movieTitle}</MovieTitle>
								<MovieImg
									src={`https://image.tmdb.org/t/p/w500${favItem.movieImg}`}
									alt={favItem.movieTitle}
								/>
							</MovieCont>
						</DivWrap>
						<DeleteBtn
							value={favItem._id}
							onClick={(event) =>
								handleUnsave("id", event.target.value)
							}
						>
							Delete
						</DeleteBtn>
					</SubContainer>
				);
			})}
		</MainContainer>
	) : (
		<NoFavorites>There are currently no favorites saved</NoFavorites>
	);
};

export default Favorites;

const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	background-image: linear-gradient(to top, #edcba9, white);
`;

const SubContainer = styled.div`
	display: flex;

	background-color: #628196;
	align-items: center;
	justify-content: space-between;
	width: 700px;
	margin: 25px;
	padding: 15px;
	border-radius: 15px;
	box-shadow: 5px 5px 30px #284455;
`;

const DivWrap = styled.div`
	display: flex;
	align-items: center;
`;

const RecipeTitle = styled.div`
	font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
	text-decoration: none;
	font-weight: 900;
	color: white;
	text-align: center;
	width: 200px;
	padding: 10px 0;
	font-size: 23px; ;
`;

const MovieTitle = styled.div`
	font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
	text-decoration: none;
	color: white;
	text-align: center;
	width: 200px;
	padding: 10px 0;
	font-size: 20px; ;
`;

const MovieCont = styled(Link)`
	text-decoration: none;
	display: flex;
	flex-direction: column;
	padding: 10px;
	width: 250px;
	height: 325px;
	align-items: center;
	justify-content: center;
	background-color: darkred;
	border-radius: 10px;
	/* color: black; */
	/* border: solid green 2px; */
	/* box-shadow: 0px 0px 30px darkred; */
	&:visited {
		color: black;
	}
	&:hover {
		box-shadow: 0px 0px 2px white, 0px 0px 15px white;
		text-shadow: 0px 0px 2px red, 0px 0px 15px white;
		transition: all 0.5s ease-in-out;

		scale: 0.9;
	}
`;

const RecipeCont = styled(Link)`
	text-decoration: none;
	display: flex;
	flex-direction: column;
	margin-right: 30px;
	padding: 10px;
	width: 250px;
	height: 325px;
	align-items: center;
	justify-content: space-evenly;
	background-color: #284455;
	/* background-color: #e4b485; */
	border-radius: 10px;
	&:visited {
		color: black;
	}
	&:hover {
		box-shadow: 0px 0px 2px white, 0px 0px 15px white;
		text-shadow: 0px 0px 2px teal, 0px 0px 15px white;
		transition: all 0.5s ease-in-out;

		scale: 0.9;
	}
`;

const MovieImg = styled.img`
	width: 150px;

	height: auto;
	margin: 10px 0;
	box-shadow: 0px 0px 3px white, 0px 0px 15px white;
	border-radius: 5px;
`;

const RecipeImg = styled.img`
	width: 200px;
	height: auto;
	margin: 10px 0;
	box-shadow: 0px 0px 3px white, 0px 0px 15px white;
	border-radius: 5px;
`;

const NoFavorites = styled.div`
	font-size: 25px;
`;

const DeleteBtn = styled.button`
	outline: none;
	border: none;
	padding: 10px 15px;
	margin-right: 10px;
	font-size: 20px;
	/* width: 120px; */
	color: white;
	background-color: red;
	border-radius: 5px;
	box-shadow: 0px 0px 2px black, 0px 0px 30px black;
	font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
	font-weight: 900;
	&:hover {
		color: white;
		transition: all 0.3s ease-in-out;
		background-color: darkred;
		scale: 0.9;
	}
`;
