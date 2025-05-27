const mongoose = require("mongoose");

const ownereSchema = mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
  picture: String,
  gstin: String,
});

module.exports = mongoose.model("owner", ownereSchema);
