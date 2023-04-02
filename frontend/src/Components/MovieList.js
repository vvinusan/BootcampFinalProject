import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const MovieList = () => {
	const { genreId } = useParams;

	console.log(genreId);
	return <Wrapper>movie list</Wrapper>;
};

export default MovieList;

const Wrapper = styled.div``;
