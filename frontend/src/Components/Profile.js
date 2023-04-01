import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
	return <div>hello</div>;
};

export default Profile;

//DONT THINK I NEED, CAN JUST EXTRACT isAuthenticated FROM userAuth0, TO CHECK IF LOGGED IN
//AND THUS CAN DISPLAY RESPECTIVE FAVORITES
