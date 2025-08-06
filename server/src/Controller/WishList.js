const { WishList } = require("../Models/WishList");

const wishlistAdd = async (req, res) => {
    try {
        const { image, title } = req.body;
        const newWish = new WishList({ image, title });
        await newWish.save();
        res.status(201).json({ message: 'WishList item added successfully', newWish });
    } catch (error) {
        console.error("❌ Error adding to wishlist:", error);
        res.status(500).json({ error: 'Failed to add wishlist item' });
    }
};

const wishlistGet = async (req, res) => {
    try {
        const wishes = await WishList.find();
        res.status(200).json({ books: wishes });
    } catch (error) {
        console.error("❌ Error getting wishlist:", error);
        res.status(500).json({ error: 'Failed to fetch wishlist items' });
    }
};

const wishlistDelete = async (req, res) => {
    try {
        const deletedWish = await WishList.findByIdAndDelete(req.params.id);
        if (!deletedWish) {
            return res.status(404).json({ error: 'Wishlist item not found' });
        }
        res.status(200).json({ message: 'Wishlist item deleted successfully', deletedWish});    
    } catch (error) {
        console.error("❌ Error deleting wishlist item:", error);
        res.status(500).json({ error: 'Failed to delete wishlist item' });
    }
}

module.exports = { wishlistAdd, wishlistGet, wishlistDelete };
