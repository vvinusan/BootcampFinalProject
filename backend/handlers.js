const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

//Unique id generation
const { v4: uuidv4 } = require("uuid");

//ADD ITEM TO CART COLLECTION

const addFavorite = async (request, response) => {
	console.log(request.body);
	const client = new MongoClient(MONGO_URI, options);

	const { userId, movieId, recipeId } = request.body;

	if (!userId || !movieId || !recipeId) {
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

module.exports = {
	addFavorite,
};
