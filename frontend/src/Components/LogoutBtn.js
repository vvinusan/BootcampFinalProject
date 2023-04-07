import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutBtn = () => {
	const { logout, isAuthenticated } = useAuth0();

	return (
		isAuthenticated && (
			<Btn
				onClick={() =>
					logout({
						logoutParams: { returnTo: window.location.origin },
					})
				}
			>
				LOGOUT
			</Btn>
		)
	);
};

export default LogoutBtn;

const Btn = styled.button`
	position: absolute;
	padding: 5px;
	font-size: 25px;
	width: 120px;
	top: 20px;
	right: 10px;
	font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
	font-weight: 900;
`;
