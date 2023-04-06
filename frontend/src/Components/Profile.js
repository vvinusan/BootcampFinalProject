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

//MIGHT JUST ADD HI, PLACETOBE23 NEXT TO LOGOUT BUTTON

// CAN JUST RENAME THIS TO FAVORITE DETAILS, AND THEN USING THE userid, add and remove dates via Mongodb ENDPOINTS

//PROBLEM WITH BELOW IS THAT AUTH0 user, isLoading and isAuthenticated, ISNT AVAILALBE TO FAVORITES FOR SOME REASON

//DONT THINK I NEED, CAN JUST EXTRACT isAuthenticated FROM userAuth0, TO CHECK IF LOGGED IN
//AND THUS CAN DISPLAY RESPECTIVE FAVORITES
