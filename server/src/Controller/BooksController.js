const { Image } = require("../Models/booksModels");

const createBooks = async (req, res) => {
	try {
		const { title, author, Publisher, price, originalPrice, discount, category } = req.body;
		const image = req.file ? req.file.path : null
		console.log("Form data received:", req.body);
		const newBooks = new Image({
			title,
			author,
			image,
			Publisher,
			price,
			originalPrice,
			discount,
			category,
		});

		await newBooks.save();

		res.status(201).json({ message: 'Book created successfully', newBooks });
	} catch (error) {
		console.error("Create Book Error: ", error);
		res.status(500).json({ message: 'Failed to create book' });
	}
};

const getBooks = async (req, res) => {
	try {
		const { category } = req.query;
		const query = category ? { category } : {};
		const books = await Image.find(query).sort({ createdAt: -1 });
		res.status(200).json({ message: 'Books fetched successfully', books });
	} catch (error) {
		console.error('Get Books Error:', error);
		res.status(500).json({ message: 'Failed to get books' });
	}
};

const deleteBooks = async (req, res) => {
	try {
		const books = await Image.findByIdAndDelete(req.params.id);
		if (!books) {
			return res.status(404).json({ message: 'Book not found' });
		}
		res.status(200).json({ message: 'Book deleted successfully' });
	} catch (error) {
		console.error('Delete Books Error:', error);
		res.status(500).json({ message: 'Failed to delete book' });
	}
};

module.exports = { createBooks, getBooks, deleteBooks };