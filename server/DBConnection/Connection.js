const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();
const dbUrl = process.env.MONGO_URL;

const dbConnection = async () => {
    try {
        if (!dbUrl) throw new Error("MongoDB URL is missing from .env file");

        await mongoose.connect(dbUrl);
        console.log("✅ MongoDB Connected Successfully");
    } catch (error) {
        console.error("❌ MongoDB Connection Failed: ", error.message);        
    }
}

module.exports = dbConnection;