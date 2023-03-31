import styled from "styled-components";
import React from "react";

const RecipeList = ({ recipeList }) => {
	return (
		<MainContainer>
			{recipeList.map((recipe) => {
				return (
					<RecipeCont key={recipe.id}>
						<Title>{recipe.title}</Title>
						<Img src={recipe.image} />
					</RecipeCont>
				);
			})}
		</MainContainer>
	);

	// {itemList.map((contents) => {
	//     return (
	//         <div key={contents.id}>
	//             <ItemContainer to={`/items/${contents.id}`}>
	//                 <Image src={contents.imageSrc} />
	//                 <ItemName>{contents.name}</ItemName>
	//                 <Seperator></Seperator>
	//                 <ItemLatName>{contents.latinName}</ItemLatName>
	//             </ItemContainer>
	//         </div>
	//     );
	// })}
};

export default RecipeList;

const MainContainer = styled.div`
	display: flex;
	justify-content: space-evenly;
`;
const RecipeCont = styled.div`
	display: flex;
	flex-direction: column;
	padding: 5px;
	background-color: lightgray;
`;

const Title = styled.div``;

const Img = styled.div`
	height: 150px;
	width: auto;
`;
