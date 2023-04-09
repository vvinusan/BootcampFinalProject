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
				{/* {isAuthenticated && <NavItem to={"/profile"}>Profile</NavItem>} */}
			</NavWrap>
		</HeaderWrap>
	);
};

const HomeLink = styled.div`
	text-decoration: none;
	text-align: center;
	color: black;
	display: flex;
	justify-content: center;
	align-items: center;
	/* background-color: #f1d7bd; */
	margin: 10px 0 0 10px;
	width: 300px;
	padding: 5px;
	text-shadow: 2px 2px 0px white;
`;

const Meals = styled.span`
	font-style: italic;
	font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
	font-weight: 700;
	/* color: #253d5b; */
	color: teal;
	/* color: #39dbd7; */
`;

const Movies = styled.span`
	font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
	color: darkred;
`;

const AndI = styled.span``;

const NavItem = styled(Link)`
	padding: 10px 35px;
	/* text-shadow: 0px 0px 5px black; */
	text-decoration: none;
	font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
	font-weight: 900;
	/* color: #284455; */
	color: white;
	font-size: 25px;
	border-radius: 5px;
	margin: 5px 20px;
	box-sizing: border-box;
	/* background-color: #99ecea; */
	background-color: darkred;

	:hover {
		/* background-color: #99ecea; */
		background-color: teal;

		text-shadow: 0px 0px 3px teal, 0px 0px 30px white;
		color: white;
		transition: all 0.3s ease-in-out;
		scale: 1.1;
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
	font-size: 35px;
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
	padding-bottom: 10px;
	background-image: linear-gradient(to bottom, #edcba9, white);
`;

export default Header;
