const { BillingDetails } = require("../Models/BillingDetails");

const addBooks = async (req, res) => {
    try {
        const {image, Product, Description, Availability, price, Discount, OurPrice, Qty, Total } = req.body
        // const image = req.file ? req.file.path : null
        console.log("Billing Details received:", req.body);

        const newBillingDetails = new BillingDetails({ 
            Product, 
            Description, 
            image, 
            Availability, 
            price, 
            Discount, 
            OurPrice, 
            Qty,
            Total 
        });
        console.log("Saved Billing Details:", newBillingDetails);

        await newBillingDetails.save();

        res.status(201).json({ message: 'Book created successfully', newBillingDetails })
    } catch (error) {
        console.error("Create Book Error: ", error);
        res.status(500).json({ message: 'Failed to create book'});
    }
};

const getBooks = async (req, res) => {
    try {
        const books = await BillingDetails.find();
        res.status(201).json({ message: 'All Books get successfully', books});
    } catch (error) {
        res.status(500).json({ message: 'Failed to get book'});
    }
}

const deleteBooks = async (req,res) => {
    try {
        const books = await BillingDetails.findByIdAndDelete(req.params.id);
        if (!books) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete book'});
    }
}

module.exports = {addBooks, getBooks, deleteBooks}