import styled from "styled-components";
import React, { useState } from "react";
import { Context } from "./Context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import RecipePreview from "./RecipePreview";
import { useEffect } from "react";

const RecipeList = ({ recipeList }) => {
	const { choiceData, setChoiceData } = useContext(Context);

	const [preview, setPreview] = useState(false);
	const [preivewId, setPreviewId] = useState({});
	const [prevIngred, setPrevIngred] = useState([]);

	const navigate = useNavigate();

	console.log(choiceData);

	const handleChoose = (key, value) => {
		setChoiceData({
			[key]: value,
		});
		navigate("/genres");
	};

	const handlePreview = (key, value) => {
		setPreviewId({
			[key]: value,
		});
		setPreview(true);

		let [prevContent] = recipeList.filter((preCont) => {
			return preCont.id === Number(value);
		});

		setPrevIngred(prevContent);
	};

	useEffect(() => {
		window.scrollTo({
			top: document.documentElement.scrollHeight,
			behavior: "smooth",
		});
	}, [prevIngred]);

	const handleClosePreview = () => {
		setPreview(false);
		setPreviewId({});
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	console.log(recipeList);
	console.log(preview);
	console.log(preivewId);

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
								{/* <IngredCont>
									<div>Missing Ingredient</div>
									{recipe.missedIngredients.map((missIng) => {
										return (
											<MissIngred key={missIng.id}>
												{missIng.original}
											</MissIngred>
										);
									})}
									<div>Available Ingredient</div>
									{recipe.usedIngredients.map((avaiIng) => {
										return (
											<AvaiIngred key={avaiIng.id}>
												{avaiIng.original}
											</AvaiIngred>
										);
									})}
								</IngredCont> */}

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
			<PreviewCont>
				{preview && (
					<div>
						{prevIngred && (
							<IngredCont>
								<div>Missing Ingredient</div>
								{prevIngred.missedIngredients.map((missIng) => {
									return (
										<MissIngred key={missIng.id}>
											{missIng.original}
										</MissIngred>
									);
								})}
								<div>Available Ingredient</div>
								{prevIngred.usedIngredients.map((avaiIng) => {
									return (
										<AvaiIngred key={avaiIng.id}>
											{avaiIng.original}
										</AvaiIngred>
									);
								})}
							</IngredCont>
						)}
						<RecipePreview recipeId={preivewId} />
						<CloseBtn onClick={handleClosePreview}>
							Close Preview
						</CloseBtn>
					</div>
				)}
			</PreviewCont>
		</MainContainer>
	);
};

export default RecipeList;

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
	padding: 5px;
	background-color: lightgray;
	margin: 5px;
	width: 300px;
	height: 300px;
`;

const Img = styled.img`
	height: 200px;
	width: 100%;
	object-fit: cover;
`;

const Title = styled.div``;

const MissIngred = styled.div`
	color: red;
`;

const AvaiIngred = styled.div``;

const IngredCont = styled.div`
	display: flex;
	flex-direction: column;
`;

const Select = styled.button``;

const PreviewCont = styled.div`
	display: flex;
	flex-direction: column;
`;

const PreviewBtn = styled.button``;

const CloseBtn = styled.button``;
