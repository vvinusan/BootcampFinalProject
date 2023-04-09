import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const LogoutBtn = () => {
	const { logout, isAuthenticated, user } = useAuth0();

	return (
		isAuthenticated && (
			<Container>
				<NameCont>
					Hi, <Name> {user.nickname}</Name>
				</NameCont>
				<Btn
					onClick={() =>
						logout({
							logoutParams: { returnTo: window.location.origin },
						})
					}
				>
					LOG OUT
				</Btn>
			</Container>
		)
	);
};

export default LogoutBtn;

const Container = styled.div`
	display: flex;
	position: absolute;
	top: 15px;
	right: 15px;
	align-items: center;
`;
const NameCont = styled.div`
	display: flex;
	color: darkred;
	font-size: 25px;
	font-weight: 900;
	font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
`;
const Name = styled.div`
	text-decoration: none;
	padding-left: 5px;
	/* color: #99ecea; */
	color: white;
	/* color: #39dbd7; */
	text-shadow: 0px 0px 2px #e4b485, 0px 0px 15px #e4b485;

	/* &:visited {

		color: white;
	} */
`;

const Btn = styled.button`
	outline: none;
	border: none;
	padding: 5px;
	margin: 10px;
	font-size: 25px;
	width: 120px;
	color: white;
	background-color: darkred;
	border-radius: 15px;
	text-shadow: 0px 0px 2px darkred, 0px 0px 30px darkred;
	font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
	font-weight: 900;
	&:hover {
		color: white;
		transition: all 0.3s ease-in-out;
		background-color: red;
		scale: 1.1;
	}
`;
