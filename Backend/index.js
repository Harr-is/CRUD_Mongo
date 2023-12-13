const express = require("express");
const app = express();
const mongoose = require("mongoose");
const {
  createMovie,
  getAllMovies,
  getOneMovie,
  deleteMovie,
  updateMovie
} = require("./MovieOperations");
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // or specify a specific origin
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

let database = mongoose.connect("mongodb://localhost:27017/Movies");

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/api/movie", function (req, res) {
  database.then(async () => {
    let Movies = await getAllMovies();
    res.send(Movies);
  });
});

app.get("/api/movie/:index", function (req, res) {
  database.then(async () => {
    if (!getOneMovie) {
      res.status(400).send("Movie Not Found");
    }
    let Movie1 = await getOneMovie(req.params.index);
    res.send(Movie1);
  });
});

app.put("/api/movie/:index", function (req, res) {
  database.then(async () => {
    //console.log(req.body);
    let update_movie = await updateMovie(
      req.params.index,
      req.body.Title,
      req.body.Director,
      req.body.ReleaseDate
    );
    res.send(update_movie);
  });
});

app.delete("/api/movie/:index", function (req, res) {
  database.then(async () => {
    let delMovie = await deleteMovie(req.params.index);
    res.send(delMovie);
  });
});

app.post("/api/movie", function (req, res) {
  database.then(async () => {
    let newMovie= await createMovie(
      req.body.Title,
      req.body.Director,
      req.body.ReleaseDate,
    );
    res.send(newMovie);
  });
});

database.catch((err) => {
  console.log("Error Connecitng " + err);
});

app.listen(3035);
