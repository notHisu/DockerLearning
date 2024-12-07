const mongoose = require("mongoose");

// Define the account schema
const accountSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  balance: { type: Number, required: true },
});

// Export the Account model
module.exports = mongoose.model("Account", accountSchema);
