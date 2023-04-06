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
						<RecipeCont to={`/recipedetails/${favItem.recipeId}`}>
							<Title>{favItem.recipeTitle}</Title>
							<Img
								src={favItem.recipeImg}
								alt={favItem.recipeTitle}
							/>
						</RecipeCont>
						<MovieCont to={`/moviedetails/${favItem.movieId}`}>
							<Title>{favItem.movieTitle}</Title>
							<Img
								src={`https://image.tmdb.org/t/p/w500${favItem.movieImg}`}
								alt={favItem.movieTitle}
							/>
						</MovieCont>

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
`;

const SubContainer = styled.div`
	display: flex;
	border: solid red 2px;
	align-items: center;
	width: 700px;
	margin-top: 5px;
`;

const Title = styled.div``;

const MovieCont = styled(Link)`
	display: flex;
	flex-direction: column;
	padding: 10px;
	align-items: center;
	color: black;
	border: solid green 2px;
	&:visited {
		color: black;
	}
`;

const RecipeCont = styled(Link)`
	display: flex;
	flex-direction: column;
	padding: 10px;
	align-items: center;
	border: solid green 2px;
	color: black;
	&:visited {
		color: black;
	}
`;

const Img = styled.img`
	width: 100px;
	/* width: auto; */
`;

const NoFavorites = styled.div`
	font-size: 25px;
`;

const DeleteBtn = styled.button`
	height: 30px;
	background-color: darkred;
	font-weight: bold;
	&:hover {
		background-color: red;
	}
`;
