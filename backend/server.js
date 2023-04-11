"use strict";

const express = require("express");
const morgan = require("morgan");

// IMPORT HANDLERS
const { addFavorite, getFavorites, deleteFavById } = require("./handlers");

const PORT = 4000;

express()
	.use(function (req, res, next) {
		res.header(
			"Access-Control-Allow-Methods",
			"OPTIONS, HEAD, GET, PUT, POST, DELETE"
		);
		res.header(
			"Access-Control-Allow-Headers",
			"Origin, X-Requested-With, Content-Type, Accept"
		);
		next();
	})
	.use(morgan("tiny"))
	.use(express.static("./server/assets"))
	.use(express.json())
	.use(express.urlencoded({ extended: false }))
	.use("/", express.static(__dirname + "/"))

	//Saved recipe, movie combo to favorites
	.post("/addFavorite", addFavorite)

	//Retrieves entire favorites collection
	.get("/getFavorites", getFavorites)

	//Deleted specific COMBO from favorites
	.delete("/deleteFavorite/:favItemId", deleteFavById)

	//Error message
	.get("*", (req, res) => {
		res.status(404).json({
			status: 404,
			message: "Error",
		});
	})

	.listen(PORT, () => console.info(`Listening on port ${PORT}`));
