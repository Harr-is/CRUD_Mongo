const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
  Title: String,
  Director: String,
  ReleaseDate: String
});
const movieModel = mongoose.model("Filmography", movieSchema);

module.exports = movieModel;
