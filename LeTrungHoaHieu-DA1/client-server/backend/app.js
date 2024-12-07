const fs = require("fs");
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import CORS
const Account = require("./models/account"); // Import the Account model
const morgan = require("morgan");

const app = express();

// Middleware
app.use(bodyParser.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS
app.use(
  morgan("combined", {
    stream: fs.createWriteStream(path.join(__dirname, "logs", "access.log"), {
      flags: "a",
    }),
  })
); // Log HTTP requests to access.log

// MongoDB connection
mongoose
  .connect("mongodb://database:27017/bank", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

// Routes

// Get all accounts
app.get("/accounts", async (req, res) => {
  try {
    const accounts = await Account.find();
    res.json(accounts);
  } catch (error) {
    console.error("Error fetching accounts", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Create a new account
app.post("/create-account", async (req, res) => {
  try {
    const { userId, email, password, balance } = req.body;
    const newAccount = new Account({ userId, email, password, balance });
    await newAccount.save();
    res.status(201).json(newAccount);
  } catch (error) {
    console.error("Error saving account", error);
    res.status(500).json({ message: "Account save error" });
  }
});

// Start server
app.listen(80, () => {
  console.log("Server running on http://localhost:80");
});
