import styled from "styled-components";
import { Link } from "react-router-dom";
import React from "react";

const Header = () => {
	return (
		<HeaderWrap>
			<Wrapper>
				<HomeLink>
					<CompanyName to={"/"}>Easy Dates</CompanyName>
					<Logo src="../main-logo.png" />
					{/* <CompanyName to={"/signin"}>Sign In</CompanyName> */}
				</HomeLink>
			</Wrapper>
			<NavWrap>
				<NavItem to={"/"}>Home</NavItem>
				<NavItem to={"/favorites"}>Favorites</NavItem>
			</NavWrap>
		</HeaderWrap>
	);
};

const Logo = styled.img`
	height: 50px;
`;

const HomeLink = styled.div`
	text-decoration: none;
	color: black;
	display: flex;
	justify-content: start;
	align-items: center;
`;

const NavItem = styled(Link)`
	padding: 20px 80px;
	text-decoration: none;
	font-family: "nimbus-sans", sans-serif;
	font-weight: 700;
	color: black;
	font-size: 25px;
	border-right: "3px solid black";
	margin: 0px;
	box-sizing: border-box;

	.leftBorder {
		border-left: 3px solid black;
	}

	:hover {
		background-color: darkred;
		color: #fff;
		transition: all 0.3s ease-in-out;
	}
`;

const NavWrap = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: center;
	border-bottom: 5px solid black;
	margin: 0px;
`;

const Wrapper = styled.div`
	border-bottom: 5px solid black;
	width: 100%;
	align-items: center;
	justify-content: center;
	height: 60px;
`;

const CompanyName = styled(Link)`
	font-family: sans-serif;
	font-weight: 900;
	font-size: 30px;
	text-decoration: none;
	&:visited {
		color: black;
	}
	:hover {
		background-color: darkred;
		color: #fff;
		transition: all 0.3s ease-in-out;
	}
`;

const HeaderWrap = styled.div`
	display: flex;
	position: relative;
	flex-direction: column;
	width: 100%;
	justify-content: center;
	align-items: center;
`;

export default Header;
