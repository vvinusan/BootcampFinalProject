import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
	const { user, isAuthenticated, isLoading } = useAuth0();

	if (isLoading) {
		return <div>Loading ...</div>;
	}

	return (
		isAuthenticated && (
			<div>
				<img src={user.picture} alt={user.name} />
				<h2>{user.name}</h2>
				<p>{user.email}</p>
				<p>{user.sub}</p>
			</div>
		)
	);
};

export default Profile;

//PROBLEM WITH BELOW IS THAT AUTH0 user, isLoading and isAuthenticated, ISNT AVAILALBE TO FAVORITES FOR SOME REASON

//DONT THINK I NEED, CAN JUST EXTRACT isAuthenticated FROM userAuth0, TO CHECK IF LOGGED IN
//AND THUS CAN DISPLAY RESPECTIVE FAVORITES
