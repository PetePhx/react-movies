import React from "react";
import Joi from "joi-browser";
import { getGenres } from "../services/fakeGenreService";
import { getMovie, saveMovie } from "../services/fakeMovieService";
import Form from "./common/form";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genre: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    errors: {},
    genres: []
  };

  componentDidMount() {
    this.setState({ genres: getGenres() });
    const movieInDb = getMovie(this.props.match.params.id);
    if (movieInDb) {
      const data = { ...movieInDb };
      data.genre = movieInDb.genre._id;
      this.setState({ data });
    }
  }

  schema = {
    _id: Joi.string(),
    title: Joi.string().required(),
    genre: Joi.string().required(),
    numberInStock: Joi.number()
      .integer()
      .required()
      .min(0)
      .max(100),
    dailyRentalRate: Joi.number()
      .required()
      .min(1)
      .max(10)
  };

  handleSave = () => {
    const movie = this.state.data;
    movie.genreId = movie.genre;
    saveMovie(movie);
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
          {this.renderDropDownMenu(
            "genre",
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
