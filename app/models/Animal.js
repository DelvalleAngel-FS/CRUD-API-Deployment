const mongoose = require("mongoose");

const animalSchema = new mongoose.Schema(
  {
    name: String,
    class: String,
  },
  {
    // This automatically creates and manages 'createdAt' and 'updatedAt' fields
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  },
);

module.exports = mongoose.model("Animal", animalSchema);
