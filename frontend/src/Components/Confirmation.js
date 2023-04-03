import React from "react";
import { useContext } from "react";
import { Context } from "./Context";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Confirmation = () => {
	const { choiceData, setChoiceData, userId, setUserId } =
		useContext(Context);

	const navigate = useNavigate();

	const handleSave = () => {
		// navigate("/favorites");
	};

	return (
		<MainCont>
			<Title>{choiceData.recipeId}</Title>
			<Title>{choiceData.movieId}</Title>
			<SaveBtn onClick={handleSave()}>Save to Favorites</SaveBtn>
		</MainCont>
	);
};

export default Confirmation;

const MainCont = styled.div`
	display: flex;
	flex-direction: column;
`;

const Title = styled.div``;

const SaveBtn = styled.button``;
