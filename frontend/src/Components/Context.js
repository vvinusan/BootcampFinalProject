import React from "react";
import { createContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const Context = createContext();

const Provider = ({ children }) => {
	const { user, isAuthenticated } = useAuth0();

	const [userId, setUserId] = useState(null);
	const [genres, setGenres] = useState([]);
	const [saved, setSaved] = useState([]);
	const [choiceData, setChoiceData] = useState({});
	const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated);
	//might not need the isLoggedIn, since auth0, checks for it already

	useEffect(() => {
		if (user && user.sub) {
			setUserId(user.sub);
		}
	}, [user]);

	useEffect(() => {
		fetch(
			`
		https://api.themoviedb.org/3/genre/movie/list?api_key=0552cedd4b9803ac1b9a12fe92f2d42b&language=en-US`
		)
			.then((res) => res.json())
			.then((data) => {
				console.log(data.genres);
				setGenres(data.genres);
			})

			.catch((error) => {
				console.log(error);
			});
	}, []);

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
				genres,
				setGenres,
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
//test push
