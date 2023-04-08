import styled from "styled-components";
import React, { useState } from "react";
import { Context } from "./Context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import RecipePreview from "./RecipePreview";
import { useEffect } from "react";
import { useRef } from "react";

const RecipeList = ({ recipeList }) => {
	const { choiceData, setChoiceData } = useContext(Context);

	const [preview, setPreview] = useState(false);
	const [preivewId, setPreviewId] = useState({});
	const [prevIngred, setPrevIngred] = useState([]);

	const navigate = useNavigate();

	// const handleChoose = (key, value) => {
	// 	setChoiceData({
	// 		[key]: value,
	// 	});
	// 	navigate("/genres");
	// };

	// const handlePreview = (key, value) => {
	// 	if (preivewId[key] !== value) {
	// 		setPreviewId({
	// 			[key]: value,
	// 		});
	// 		setPreview(true);

	// 		// setPreviewId({
	// 		// 	[key]: value,
	// 		// });
	// 		// setPreview(true);

	// 		let [prevContent] = recipeList.filter((preCont) => {
	// 			return preCont.id === Number(value);
	// 		});

	// 		setPrevIngred(prevContent);

	// 		window.scrollTo({
	// 			top: document.documentElement.scrollHeight,
	// 			behavior: "smooth",
	// 		});
	// 	}
	// };

	// // useEffect(() => {

	// // }, [prevIngred]);

	// useEffect(() => {
	// 	window.scrollTo(0, 0);
	// }, []);

	// const handleClosePreview = () => {
	// 	setPreview(false);
	// 	setPreviewId({});
	// 	window.scrollTo({ top: 0, behavior: "smooth" });
	// };

	const handleChoose = (key, value) => {
		setChoiceData({
			[key]: value,
		});
		navigate("/genres");
	};

	const handlePreview = (key, value) => {
		if (preivewId[key] !== value) {
			setPreviewId({
				[key]: value,
			});
			setPreview(true);

			let [prevContent] = recipeList.filter((preCont) => {
				return preCont.id === Number(value);
			});

			setPrevIngred(prevContent);
		}
	};

	const subPrevContRef = useRef(null);

	useEffect(() => {
		if (preview) {
			subPrevContRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [preview]);

	const handleClosePreview = () => {
		setPreview(false);
		setPreviewId({});
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	console.log(prevIngred);

	return (
		<MainContainer>
			<SubContainer>
				{recipeList.length !== 0 ? (
					recipeList.map((recipe) => {
						return (
							<RecipeCont key={recipe.id}>
								<Title>{recipe.title}</Title>
								<Img src={recipe.image} alt="image of dish" />
								<BtnCont>
									<Select
										value={recipe.id}
										onClick={(event) =>
											handleChoose(
												"recipeId",
												event.target.value
											)
										}
									>
										Select Recipe
									</Select>
									<PreviewBtn
										value={recipe.id}
										onClick={(event) => {
											handlePreview(
												"recipeId",
												event.target.value
											);
										}}
									>
										Preview Recipe
									</PreviewBtn>
								</BtnCont>
							</RecipeCont>
						);
					})
				) : (
					<NoResults>
						There are no recipes for the requested ingredients.
						Please verify spelling or query again
					</NoResults>
				)}
			</SubContainer>
			{recipeList.length !== 0 && (
				<PreviewCont>
					<CloseBtn onClick={handleClosePreview}>
						Close Preview
					</CloseBtn>
					{preview && (
						<SubPrevCont ref={subPrevContRef}>
							{prevIngred && (
								<IngredCont>
									<div>Missing Ingredient</div>
									{prevIngred.missedIngredients.map(
										(missIng) => {
											return (
												<MissIngred key={missIng.id}>
													{missIng.original}
												</MissIngred>
											);
										}
									)}
									<div>Available Ingredient</div>
									{prevIngred.usedIngredients.map(
										(avaiIng) => {
											return (
												<AvaiIngred key={avaiIng.id}>
													{avaiIng.original}
												</AvaiIngred>
											);
										}
									)}
								</IngredCont>
							)}
							<RecipePreview recipeId={preivewId} />
						</SubPrevCont>
					)}
				</PreviewCont>
			)}
		</MainContainer>
	);
};

export default RecipeList;

const SubPrevCont = styled.div`
	display: flex;
	font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
	/* padding: 20px; */
	flex-direction: row-reverse;
`;

const NoResults = styled.div``;

const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

const SubContainer = styled.div`
	justify-content: space-evenly;
	display: flex;
	flex-wrap: wrap;
`;
const RecipeCont = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
	padding: 5px;
	background-color: #628196;
	margin: 5px;
	width: 300px;
	height: 300px;
`;

const Img = styled.img`
	height: 200px;
	width: 100%;
	object-fit: cover;
	border-radius: 5px;
`;

const Title = styled.div`
	font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
	color: white;
	font-size: 20px;
	text-align: center;
	padding: 5px 0;
`;

const MissIngred = styled.div`
	color: red;
`;

const AvaiIngred = styled.div``;

const IngredCont = styled.div`
	display: flex;
	flex-direction: column;
	margin-right: 20px;
`;

const Select = styled.button`
	outline: none;
	border: none;
	margin-right: 10px;
	padding: 5px;
	font-size: 12px;
	width: 100px;

	color: white;
	background-color: darkred;
	border-radius: 5px;

	font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
	font-weight: 900;
	&:hover {
		color: white;
		transition: all 0.3s ease-in-out;
		background-color: red;
		scale: 1.1;
		text-shadow: 0px 0px 30px white;
	}
`;

const PreviewCont = styled.div`
	display: flex;
	flex-direction: row-reverse;
	justify-content: space-evenly;
	align-items: center;
	padding: 10px;
	/* border: white solid 3px; */
`;

const PreviewBtn = styled.button`
	outline: none;
	border: none;

	padding: 5px;
	font-size: 12px;
	width: 100px;

	color: white;
	background-color: #99ecea;
	border-radius: 5px;

	font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
	font-weight: 900;
	&:hover {
		color: white;
		transition: all 0.3s ease-in-out;
		background-color: #284455;
		scale: 1.1;
		text-shadow: 0px 0px 30px white;
	}
`;

const CloseBtn = styled.button`
	outline: none;
	border: none;

	padding: 5px;
	font-size: 15px;
	width: 100px;

	color: white;
	background-color: #99ecea;
	border-radius: 5px;

	font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
	font-weight: 900;
	&:hover {
		color: white;
		transition: all 0.3s ease-in-out;
		background-color: #628196;
		scale: 1.1;
		text-shadow: 0px 0px 30px white;
	}
`;

const BtnCont = styled.div`
	display: flex;
	/* justify-content: space-between; */
`;
