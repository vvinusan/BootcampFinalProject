const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

//Unique id generation
const { v4: uuidv4 } = require("uuid");

//ADD ITEM TO FAVORITES COLLECTION

const addFavorite = async (request, response) => {
	console.log(request.body);
	const client = new MongoClient(MONGO_URI, options);

	const { userId, movieId, recipeId, recipeTitle, movieTitle } = request.body;

	if (!userId || !movieId || !recipeId || !recipeTitle || !movieTitle) {
		response
			.status(400)
			.json({ status: 400, message: "Missing item information" });
		return;
	}

	try {
		await client.connect();

		const db = client.db("BootcampSoloProject");
		const favCollection = db.collection("favorites");

		const newItem = {
			userId: userId,
			_id: uuidv4(),
			movieId: movieId,
			recipeId: recipeId,
			movieTitle: movieTitle,
			recipeTitle: recipeTitle,
		};

		console.log(newItem);
		const result = await favCollection.insertOne(newItem);

		if (result.insertedCount === 0) {
			response
				.status(500)
				.json({ status: 500, message: "Failed to add favorite" });
			return;
		}
		response.status(201).json({
			status: 201,
			data: { item: newItem, _id: result, message: "Favorite added" },
		});
	} catch (error) {
		console.error(error);
		response
			.status(400)
			.json({ status: 400, message: "Error, bad request" });
	} finally {
		client.close();
	}
};

//RETRIEVE ENTIRE FAVORITES COLLECTION

const getFavorites = async (request, response) => {
	const client = new MongoClient(MONGO_URI, options);
	try {
		await client.connect();

		const db = client.db("BootcampSoloProject");

		const favObj = db.collection("favorites");

		const favItems = await favObj.find().toArray();

		response.status(200).json({ status: 200, data: favItems });
	} catch (error) {
		console.error(error);
		response
			.status(400)
			.json({ status: 400, message: "Error, bad request" });
	} finally {
		client.close();
	}
};

//DELETED ITEM FROM CART COLLECTION

const deleteFavById = async (request, response) => {
	const client = new MongoClient(MONGO_URI, options);

	let { favItemId } = request.params;

	// favItemId = Number(favItemId);

	if (!favItemId) {
		response.status(400).json({ status: 400, message: "Missing item id" });
		return;
	}

	try {
		await client.connect();

		const db = client.db("BootcampSoloProject");
		const favCollection = db.collection("favorites");

		const result = await favCollection.deleteOne({ _id: favItemId });

		if (result.deletedCount === 0) {
			response
				.status(404)
				.json({ status: 404, message: "Favorite not found" });
			return;
		}

		response
			.status(200)
			.json({ status: 200, message: "Favorite deleted successfully" });
	} catch (error) {
		console.error(error);
		response
			.status(400)
			.json({ status: 400, message: "Error, bad request" });
	} finally {
		client.close();
	}
};

module.exports = {
	addFavorite,
	getFavorites,
	deleteFavById,
};
