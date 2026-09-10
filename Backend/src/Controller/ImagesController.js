import { bucket } from "../DBConnection/FirebaseConnection.js";
import { Image } from "../Models/imagesModels.js";
import fs from "node:fs";

const createBooks = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No image uploaded" });

    const { title, author, Publisher, price, originalPrice, discount, category } = req.body;

    if (!title || !price || !originalPrice || !discount || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Upload to Firebase
    const localFile = req.file.path;
    const firebaseFile = bucket.file(`books/${Date.now()}-${req.file.originalname}`);
    await firebaseFile.save(fs.readFileSync(localFile), { metadata: { contentType: req.file.mimetype } });
    await firebaseFile.makePublic();

    const imageUrl = `https://storage.googleapis.com/${bucket.name}/${firebaseFile.name}`;

    const newBook = new Image({
      title, author, Publisher, price, originalPrice, discount, category, image: imageUrl
    });

    await newBook.save();
    fs.unlinkSync(localFile); // remove local file

    res.status(201).json({ message: "Book created", newBook });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};



const getBooks = async (req, res) => {
  try {
    const { category } = req.query;
    const query = category ? { category } : {};
    const books = await Image.find(query).sort({ createdAt: -1 });
    res.status(200).json({ message: "Books fetched successfully", books });
  } catch (error) {
    console.error("Get Books Error:", error);
    res.status(500).json({ message: "Failed to get books" });
  }
};

const deleteBooks = async (req, res) => {
  try {
    const book = await Image.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    // Delete image from Firebase
    const firebasePath = book.image.split(`https://storage.googleapis.com/${bucket.name}/`)[1];
    if (firebasePath) await bucket.file(firebasePath).delete();

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Delete Books Error:", error);
    res.status(500).json({ message: "Failed to delete book", error: error.message });
  }
};


export { createBooks, getBooks, deleteBooks };
