import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const LoginBtn = () => {
	const { loginWithRedirect, isAuthenticated } = useAuth0();

	return (
		!isAuthenticated && (
			<Btn onClick={() => loginWithRedirect()}>LOG IN</Btn>
		)
	);
};

export default LoginBtn;

const Btn = styled.button`
	outline: none;
	border: none;
	position: absolute;
	padding: 5px;
	font-size: 25px;
	width: 120px;
	top: 15px;
	color: white;
	background-color: darkred;
	border-radius: 15px;
	right: 15px;
	font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
	font-weight: 900;
	&:hover {
		color: white;
		transition: all 0.3s ease-in-out;
		background-color: red;
		scale: 1.1;
	}
`;
