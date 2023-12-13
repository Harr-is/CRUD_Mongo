const movieModel = require("./models/Filmography");

const createMovie = async (Title, Director, ReleaseDate) => {
  console.log("Runnng Successfully! ");
  let Movie = new movieModel();
  Movie.Title = Title;
  Movie.Director = Director;
  Movie.ReleaseDate = ReleaseDate;
  await Movie.save();
  return Movie;
};

const getAllMovies = async () => {
  let Movie = await movieModel.find();
  return Movie;
};

const getOneMovie = async (_id) => {
  let Movie1 = await movieModel.findById(_id);
  return Movie1;
};

const deleteMovie = async (_id) => {
  let Movie = await movieModel.findByIdAndDelete(_id);
  console.log("Deleted Successfully");
  return Movie;
};

const updateMovie = async (
  _id,
  Title,
  Director,
  ReleaseDate
) => {
  let Movie = await movieModel.findById(_id);
  Movie.Title = Title;
  Movie.Director = Director;
  Movie.ReleaseDate = ReleaseDate;
  await Movie.save();
  return Movie;
};

module.exports.createMovie = createMovie;
module.exports.getAllMovies = getAllMovies;
module.exports.getOneMovie = getOneMovie;
module.exports.deleteMovie = deleteMovie;
module.exports.updateMovie = updateMovie;
