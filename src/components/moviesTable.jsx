import React, { Component } from "react";
import Like from "./common/like";

class MoviesTable extends Component {
  raiseSort = path => {
    const order =
      this.props.sortColumn.path === path
        ? this.props.sortColumn.order === "asc"
          ? "desc"
          : "asc"
        : "asc";
    const sortColumn = { path, order };
    this.props.onSort(sortColumn);
  };

  render() {
    const { moviesDisplayed, onDelete, onLike } = this.props;

    return (
      <table className="table">
        <thead>
          <tr>
            <th onClick={() => this.raiseSort("title")}>Title</th>
            <th onClick={() => this.raiseSort("genre.name")}>Genre</th>
            <th onClick={() => this.raiseSort("numberInStock")}>Stock</th>
            <th onClick={() => this.raiseSort("dailyRentalRate")}>Rate</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {moviesDisplayed.map((movie, idx) => (
            <tr key={idx}>
              <td>{movie.title}</td>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td>
                <Like isLiked={movie.isLiked} onLike={() => onLike(movie)} />
              </td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => onDelete(movie)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default MoviesTable;
