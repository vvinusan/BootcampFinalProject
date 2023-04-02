import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import { useEffect } from "react";

const MovieDetails = () => {
	const { movieId } = useParams();

	console.log(movieId);
	return <MainCont>movie details</MainCont>;
};

export default MovieDetails;

const MainCont = styled.div``;
