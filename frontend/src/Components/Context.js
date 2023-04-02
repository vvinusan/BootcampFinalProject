import React from "react";
import { createContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const Context = createContext();

const Provider = ({ children }) => {
	const { user, isAuthenticated } = useAuth0();

	const [userId, setUserId] = useState(null);
	const [saved, setSaved] = useState([]);
	//choiceData ~ formData from pizza, enter key value pairs
	//uuid: uuid forgot how to call
	//userId:, recipeId:, movieId:
	const [choiceData, setChoiceData] = useState({});
	const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated);
	//might not need the isLoggedIn, since auth0, checks for it already

	useEffect(() => {
		if (user && user.sub) {
			setUserId(user.sub);
		}
	}, [user]);

	return (
		<Context.Provider
			value={{
				userId,
				setUserId,
				saved,
				setSaved,
				isLoggedIn,
				setIsLoggedIn,
				choiceData,
				setChoiceData,
			}}
		>
			{children}
		</Context.Provider>
	);
};

export default Provider;
//Retrieve entire cart
//   useEffect(() => {
//     fetch("/cart")
//       .then((res) => res.json())
//       .then((data) => {
//         setCart(data.data);
//       });
//   }, []);
