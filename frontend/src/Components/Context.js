import React from "react";
import { createContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const Context = createContext();

const Provider = ({ children }) => {
	const { user } = useAuth0();

	const [userId, setUserId] = useState(null);
	const [genres, setGenres] = useState([]);
	const [choiceData, setChoiceData] = useState({});

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
