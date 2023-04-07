import React from "react";
import styled from "styled-components";
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
				<div>
					<C1>1wertyjh</C1>
					<C2>2brbtrbbbb</C2>
					<C3>3bbvmnbvvvv</C3>
					<C4>darkred</C4>
					<C5>5vvvvvvvvvvvv</C5>
				</div>
			</div>
		)
	);
};

export default Profile;

const C1 = styled.span`
	height: 50px;
	width: 50px;
	background-color: #f9a03f;
`;
const C2 = styled.span`
	height: 50px;
	width: 50px;
	background-color: #004e66;
`;

const C3 = styled.span`
	height: 50px;
	width: 50px;
	background-color: #f2d7ee;
`;

const C4 = styled.span`
	height: 50px;
	width: 50px;
	background-color: #8b0000;
`;

const C5 = styled.span`
	height: 50px;
	width: 50px;
	background-color: #e1e1e1;
`;

//MIGHT JUST ADD HI, PLACETOBE23 NEXT TO LOGOUT BUTTON

// CAN JUST RENAME THIS TO FAVORITE DETAILS, AND THEN USING THE userid, add and remove dates via Mongodb ENDPOINTS

//PROBLEM WITH BELOW IS THAT AUTH0 user, isLoading and isAuthenticated, ISNT AVAILALBE TO FAVORITES FOR SOME REASON

//DONT THINK I NEED, CAN JUST EXTRACT isAuthenticated FROM userAuth0, TO CHECK IF LOGGED IN
//AND THUS CAN DISPLAY RESPECTIVE FAVORITES
