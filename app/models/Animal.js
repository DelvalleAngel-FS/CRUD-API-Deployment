const mongoose = require("mongoose");

const animalSchema = new mongoose.Schema({
  name: String,
  class: String,
});

module.exports = mongoose.model("Animal", animalSchema);
