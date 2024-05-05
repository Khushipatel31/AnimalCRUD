const mongoose = require("mongoose");
const animalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  species: { type: String, required: true },
  habitat: { type: String, required: true },
  diet: { type: String, required: true },
  lifespan: { type: Number, required: true },
});

module.exports = mongoose.model("animals", animalSchema, "animals");
