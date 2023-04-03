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
				setFavorites(data.data);
			});
	}, []);

	//filter for each logged in users own favorites, then map through that array
	//need fetch from spoon and tmdb for titles and images, these will be links to respective details pages

	//delete button with its corresponding fetch(DELETE) in the onClick = {handleUnsave}
	// const handleUnsave = (event, id) => {
	// 	// remove items from cart where id matches, store in newCart and update the cart state
	// 	const newCart = cart.filter((item) => {
	// 	  return item._id !== id;
	// 	});
	// 	setCart(newCart);
	// 	fetch(`/deleteCart/${id}`, {
	// 	  method: "DELETE",
	// 	}).then((res) => res.json());
	//   };
	//filter by _id === whatever and remove
	console.log(favorites);
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
