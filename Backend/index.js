import "dotenv/config";
import express from "express";
import dbConnection from "./src/DBConnection/MongoDBConnection.js";
import index from "./src/Routes/main.js";
import cors from "cors";
import path from "node:path";
import adminRoutes from "./src/Routes/Admin.js";

const app = express();
const port = process.env.PORT || 8000;

app.use(cors({
  origin: '*',
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder (for old local uploads)
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/books", index);
app.use("/admin", adminRoutes);

dbConnection();

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
