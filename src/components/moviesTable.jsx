import React from "react";
import Like from "./common/like";

const MoviesTable = props => {
  const { moviesOfGenre, moviesDisplayed, onDelete, onLike } = props;
  return (
    <React.Fragment>
      <p>Showing {moviesOfGenre.length} movies:</p>
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
    </React.Fragment>
  );
};

export default MoviesTable;
