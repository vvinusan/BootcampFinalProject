import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./Profile";
import { useEffect } from "react";
import { useState } from "react";

const Favorites = () => {
	const { user, isAuthenticated } = useAuth0();

	const [favorites, setFavorites] = useState([]);

	//Retrieve favorites
	useEffect(() => {
		fetch("/getFavorites")
			.then((res) => res.json())
			.then((data) => {
				console.log(data.data);
				// setFavorites(data.data);
			});
	}, []);

	return (
		isAuthenticated && (
			<div>
				<div>{user.sub}</div>
				<Profile />;
			</div>
		)
	);
};

export default Favorites;

//why dont i have access to userAuth0 parameters here???
//NVM I ACTUALLY DO
