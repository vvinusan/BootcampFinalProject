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
	position: absolute;
	padding: 5px;
	font-size: 25px;
	width: 100px;
	top: 20px;
	right: 10px;
	font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
	font-weight: 900;
`;
