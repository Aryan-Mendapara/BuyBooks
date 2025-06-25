require('dotenv').config();
const express = require("express");
const dbConnection = require("./src/DBConnection/Connection.js");
const index = require('./src/Routes/main.js');
const cors = require("cors");
const app = express();
const port = process.env.PORT || 7000;

app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173", 
          "http://localhost:5174"], // React frontend
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
}));

app.use("/books",index);

dbConnection();
app.listen(port, () => {
    console.log("Server start", port);
})