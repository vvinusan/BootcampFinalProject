import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./Profile";

const Favorites = () => {
	const { user, isAuthenticated } = useAuth0();
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
