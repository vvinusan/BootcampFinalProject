const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

//ADD ITEM TO CART COLLECTION

const addFavorite = async (request, response) => {
	const client = new MongoClient(MONGO_URI, options);

	const { userId, _id, movieId, recipeId } = request.body;

	if (!userId || !movieId || !recipeId || !_id) {
		response
			.status(400)
			.json({ status: 400, message: "Missing item information" });
		return;
	}

	try {
		await client.connect();

		const db = client.db("BootcampSoloProject");
		const cartCollection = db.collection("favorites");

		const newItem = {
			userId,
			_id,
			movieId,
			recipeId,
		};

		const result = await cartCollection.insertOne(newItem);

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
