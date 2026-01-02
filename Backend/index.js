const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./ConnectDB/mongoose");
const contactRoutes = require("./Routes/ContactRoutes");

// 1. Config
dotenv.config();
const PORT = process.env.PORT || 5000;

// 2. Connect to Database
connectDB();

const app = express();

// 3. Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 4. Routes
app.use("/api/contacts", contactRoutes);

// 5. Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
