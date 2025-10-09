const { BillingDetails } = require("../Models/BillingDetails");

const addBooks = async (req, res) => {
  try {
    const {
      title,
      author,
      Publisher,
      price,
      originalPrice,
      discount,
      image
    } = req.body;

    const newBilling = new BillingDetails({
      Product: title.replace(/"/g, ''),
      Description: `${author.replace(/"/g, '')}, ${Publisher.replace(/"/g, '')}`,
      Availability: "In Stock",
      Price: originalPrice,
      Discount: discount,
      OurPrice: price,
      Qty: 1,
      Total: price,
      image
    });

    const savedBilling = await newBilling.save();
    console.log("Saved Billing Details:", savedBilling);
    res.status(201).json(savedBilling);
  } catch (err) {
    console.error("Create Book Error: ", err);
    res.status(500).json({ error: err.message });
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