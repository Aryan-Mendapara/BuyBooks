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

const getBooks = async (req, res) => {
    try {
        const books = await Image.find();
        res.status(201).json({ message: 'All Books get successfully', books});
    } catch (error) {
        res.status(500).json({ message: 'Failed to get book'});
    }
}

const deleteBooks = async (req,res) => {
    try {
        const books = await Image.findByIdAndDelete(req.params.id);
        if (!books) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete book'});
    }
}

module.exports = {createBooks, getBooks, deleteBooks}