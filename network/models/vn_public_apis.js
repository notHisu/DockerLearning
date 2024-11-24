const mongoose = require("mongoose");

const provinceSchema = new mongoose.Schema({
  id: String,
  name: String,
  slug: String,
  type: String,
  name_with_type: String,
  code: String,
  isDeleted: Boolean,
  // Add other fields as necessary
});

const districtSchema = new mongoose.Schema({
  id: String,
  name: String,
  slug: String,
  name_with_type: String,
  path: String,
  path_with_type: String,
  code: String,
  parent_code: String,
  isDeleted: Boolean,
  // Add other fields as necessary
});

const wardSchema = new mongoose.Schema({
  id: String,
  name: String,
  slug: String,
  name_with_type: String,
  path: String,
  path_with_type: String,
  code: String,
  parent_code: String,
  isDeleted: Boolean,
  // Add other fields as necessary
});

const Province = mongoose.model("Province", provinceSchema);
const District = mongoose.model("District", districtSchema);
const Ward = mongoose.model("Ward", wardSchema);

module.exports = { Province, District, Ward };
