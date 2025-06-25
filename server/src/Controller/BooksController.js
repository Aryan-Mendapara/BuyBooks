const { Image } = require("../Models/booksModels")

const createBooks = async (req, res) => {
    try {
        const { title, author, description } = req.body
        const image = req.file ? req.file.path : null

        const newBooks = new Image({ title, author, description, image });
        await newBooks.save();

        res.status(201).json({ message: 'Book created successfully', newBooks })
    } catch (error) {
        res.status(500).json({ message: 'Failed to create book'});
    }
};

module.exports = createBooks