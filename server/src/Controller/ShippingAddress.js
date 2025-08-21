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

module.exports = { addAddress };