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

	const previewContRef = useRef(null);

	useEffect(() => {
		if (preview) {
			previewContRef.current.scrollIntoView({ behavior: "smooth" });
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
				{recipeList.length >= 0 ? (
					recipeList.length !== 0 ? (
						recipeList.map((recipe) => {
							return (
								<RecipeCont key={recipe.id}>
									<Title>{recipe.title}</Title>
									<Img
										src={recipe.image}
										alt="image of dish"
									/>
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
					)
				) : (
					<>Loading...</>
				)}
			</SubContainer>
			{recipeList.length !== 0 && (
				<PreviewCont ref={previewContRef}>
					{preview && (
						<CloseBtn onClick={handleClosePreview}>
							Close Preview
						</CloseBtn>
					)}
					{preview && (
						<SubPrevCont>
							{prevIngred && (
								<IngredCont>
									{prevIngred.missedIngredients.length !==
										0 && (
										<MissIngredSubCont>
											<MissTitle>
												Missing Ingredients
											</MissTitle>
											<IngredList>
												{prevIngred.missedIngredients.map(
													(missIng) => (
														<IngredItem
															key={missIng.id}
														>
															{missIng.original}
														</IngredItem>
													)
												)}
											</IngredList>
										</MissIngredSubCont>
									)}
									<AvaiIngredSubCont>
										<AvaiTitle>
											Available Ingredients
										</AvaiTitle>
										<IngredList>
											{prevIngred.usedIngredients.map(
												(avaiIng) => (
													<IngredItem
														key={avaiIng.id}
													>
														{avaiIng.original}
													</IngredItem>
												)
											)}
											{prevIngred.missedIngredients
												.length === 0 && (
												<IngredEmpty>
													No missing ingredients
												</IngredEmpty>
											)}
										</IngredList>
									</AvaiIngredSubCont>
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

	flex-direction: row-reverse;
	justify-content: space-between;
	align-items: center;
`;

const NoResults = styled.div`
	font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
	font-size: 20px;
	font-weight: 900;
`;

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
	border-radius: 15px;
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
	font-weight: 900;
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
	justify-content: space-around;
	align-items: center;
	padding: 10px;
	height: 300px;
	margin-bottom: 15px;
`;

const PreviewBtn = styled.button`
	outline: none;
	border: none;

	padding: 5px;
	font-size: 12px;
	width: 100px;

	color: #284455;
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

	color: #284455;
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
`;

//////////////////////////////////
const IngredCont = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-top: 20px;
	width: 800px;
	font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
`;

const MissTitle = styled.div`
	font-weight: 900;
	font-size: 15px;
	text-align: center;
`;

const AvaiTitle = styled.div`
	font-weight: 900;
	font-size: 15px;
	text-align: center;
`;

const MissIngredSubCont = styled.div`
	display: flex;
	flex-direction: column;
	border-radius: 10px;
	background-color: darkred;
	color: white;
	padding: 5px;
	width: 50%;
	margin-bottom: 15px;
`;

const AvaiIngredSubCont = styled.div`
	display: flex;
	flex-direction: column;
	margin: 0 20px;
	border-radius: 10px;
	background-color: #284455;
	color: white;
	padding: 5px;
	width: 50%;
	margin-bottom: 15px;
`;

const IngredList = styled.div`
	display: flex;
	flex-direction: column;
`;

const IngredItem = styled.div`
	font-size: 15px;
`;

const IngredEmpty = styled.div`
	font-size: 15px;
	color: #aaa;
`;
