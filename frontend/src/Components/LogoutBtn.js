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
				Logout
			</Btn>
		)
	);
};

export default LogoutBtn;

const Btn = styled.button`
	position: absolute;
	padding: 5px;
	font-size: 20px;
	width: 100px;
	top: 15px;
	right: 10px;
`;
