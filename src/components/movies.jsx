import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";

class Movies extends Component {
  state = {
    movies: getMovies()
  };

  handleDelete = movieIdx => {
    const movies = this.state.movies.filter((_, idx) => idx !== movieIdx);
    this.setState({ movies });
  };

  handleLike = movieIdx => {
    let { movies } = this.state;
    movies[movieIdx] = { ...movies[movieIdx] };
    movies[movieIdx].isLiked = !movies[movieIdx].isLiked;
    this.setState({ movies });
  };

  render() {
    const len = this.state.movies.length;
    if (len === 0) return <p>There are no movies in the database!</p>;
    return (
      <React.Fragment>
        <p>Showing {len} movies:</p>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map((movie, idx) => (
              <tr key={idx}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like
                    isLiked={movie.isLiked}
                    onLike={() => this.handleLike(idx)}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(idx)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Movies;
