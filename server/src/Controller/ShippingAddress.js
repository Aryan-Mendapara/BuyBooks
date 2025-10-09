const ShippingAddress = require("../Models/ShippingAddress");

const addAddress = async (req, res) => {
    try {
        const { surName, firstName, lastName, email, mobileno, address, city, state, country, zipcode } = req.body;
        console.log("Received address data:", req.body);

        if (!surName || !firstName || !lastName || !email || !mobileno || !address || !city || !state || !country || !zipcode) {
            return res.status(400).json({ message: "Email and Mobile are required" });
        }

        const newAddress = new ShippingAddress({
            surName,
            firstName,
            lastName,
            email,
            mobileno,
            address,
            city,
            state,
            country,
            zipcode
        });
        await newAddress.save();
        console.log("Address saved successfully:", newAddress);
        res.status(201).json({ message: 'Address added successfully', newAddress });

    } catch (error) {
        console.error("❌ Error adding address:", error);
        res.status(500).json({ error: 'Failed to add address' });
    }
}

const getAddress = async (req, res) => {
    try {
        const addresses = await ShippingAddress.find();
        console.log("Fetched addresses:", addresses);
        res.status(200).json({ message: 'Addresses fetched successfully', addresses });
    } catch (error) {
        console.error("❌ Error fetching addresses:", error);
        res.status(500).json({ error: 'Failed to fetch addresses' });
    }
}

const deleteAddress = async (req, res) => {
    try {
        const deletedAddress = await ShippingAddress.findByIdAndDelete(req.params.id);        
        if (!deletedAddress) {
            return res.status(404).json({ message: 'Address not found' });
        }
        
        console.log("Address deleted successfully:", deletedAddress);
        res.status(200).json({ message: 'Address deleted successfully', deletedAddress });
    } catch (error) {
        console.error("❌ Error deleting address:", error);
        res.status(500).json({ error: 'Failed to delete address' });
    }
}

module.exports = { addAddress, getAddress, deleteAddress };