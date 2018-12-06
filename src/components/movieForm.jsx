import React from "react";
import Joi from "joi-browser";
import { getGenres } from "../services/fakeGenreService";
import { getMovie, saveMovie } from "../services/fakeMovieService";
import Form from "./common/form";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    errors: {},
    genres: []
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .integer()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(1)
      .max(10)
      .label("Rental Rate")
  };

  componentDidMount() {
    this.setState({ genres: getGenres() });
    if (this.props.match.url === "/movies/new") return; // no DB query

    const movieInDb = getMovie(this.props.match.params.id);
    if (!movieInDb) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(movieInDb) });
  }

  mapToViewModel = movie => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  };

  handleSave = () => {
    saveMovie(this.state.data);

    this.props.history.push("/movies");
  };

  doSubmit = () => {
    this.handleSave();
  };

  render() {
    const { genres } = this.state;
    return (
      <div>
        <h1>Movie Form: {this.props.match.params.id} </h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title", { autoFocus: true })}
          {this.renderSelect(
            "genreId",
            "Genre",
            genres.map(gnr => gnr._id),
            genres.map(gnr => gnr.name)
          )}
          {this.renderInput("numberInStock", "Number in Stock")}
          {this.renderInput("dailyRentalRate", "Daily Rate")}

          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
