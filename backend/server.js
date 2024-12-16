const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

// Routes
app.get("/", (req, res) => res.send("API is running..."));
app.use("/api", routes);
app.use("/uploads", express.static("uploads"));

app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}/ `)
);
