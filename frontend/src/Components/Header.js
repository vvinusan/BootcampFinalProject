import styled from "styled-components";
import { Link } from "react-router-dom";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
	const { isAuthenticated } = useAuth0();
	return (
		<HeaderWrap>
			<Wrapper>
				<HomeLink>
					<CompanyName to={"/"}>
						<Meals>meals,</Meals>
						<Movies> MOVIES</Movies>
						<AndI> & I</AndI>
					</CompanyName>
				</HomeLink>
			</Wrapper>
			<NavWrap>
				<NavItem to={"/"}>Home</NavItem>
				{isAuthenticated && (
					<NavItem to={"/favorites"}>Favorites</NavItem>
				)}
				{isAuthenticated && <NavItem to={"/profile"}>Profile</NavItem>}
			</NavWrap>
		</HeaderWrap>
	);
};

const HomeLink = styled.div`
	text-decoration: none;
	color: black;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: lightgray;
	margin: 10px 0 0 10px;
	width: 250px;
	padding: 5px;
`;

const Meals = styled.span`
	font-style: italic;
	font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
	font-weight: 400;
`;

const Movies = styled.span`
	font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
`;

const AndI = styled.span``;

const NavItem = styled(Link)`
	padding: 15px 40px;

	text-decoration: none;
	font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
	font-weight: 900;
	color: black;
	font-size: 25px;
	border-radius: 5px;
	margin: 0px 20px;
	box-sizing: border-box;

	:hover {
		background-color: darkred;
		color: #fff;
		transition: all 0.5s ease-in-out;
	}
`;

const NavWrap = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: center;

	margin: 0px;
`;

const Wrapper = styled.div`
	width: 100%;
	align-items: center;
	justify-content: center;
	height: 60px;
`;

const CompanyName = styled(Link)`
	font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
	font-weight: 900;
	font-size: 30px;
	text-decoration: none;
	&:visited {
		color: black;
	}
`;

const HeaderWrap = styled.div`
	display: flex;
	position: relative;
	flex-direction: column;
	width: 100%;
	justify-content: center;
	align-items: center;
	margin: 0;
`;

export default Header;
