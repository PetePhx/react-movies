import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Like from "./common/like";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: null
  };

  componentDidMount() {
    this.setState({
      movies: getMovies(),
      genres: [{ _id: 0, name: "All Genres" }, ...getGenres()]
    });

    this.setState({ selectedGenre: { _id: 0, name: "All Genres" } });
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(mv => mv._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = movie => {
    let movieUpdated = movie;
    movieUpdated.isLiked = !movie.isLiked;
    let { movies } = this.state;
    const idx = movies.findIndex(mv => mv._id === movie._id);
    movies[idx] = movieUpdated;
    this.setState({ movies });
  };

  handlePageChange = pageNum => {
    this.setState({ currentPage: pageNum });
  };

  handleGenreSelect = genre => {
    const idx = this.state.genres.findIndex(gnr => gnr.name === genre.name);
    this.setState({
      selectedGenre: this.state.genres[idx],
      currentPage: 1
    });
  };

  filterMoviesByGenre = (movieArr, selGenre) => {
    if (selGenre.name === "All Genres") return movieArr;
    return movieArr.filter(movie => movie.genre.name === selGenre.name);
  };

  render() {
    console.log(this.state.genres);

    const len = this.state.movies.length;
    if (len === 0) return <p>There are no movies in the database!</p>;

    const { movies, genres, currentPage, pageSize, selectedGenre } = this.state;
    const moviesOfGenre = this.filterMoviesByGenre(movies, selectedGenre);
    const moviesDisplayed = paginate(moviesOfGenre, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            onItemSelect={this.handleGenreSelect}
            selectedItem={selectedGenre}
          />
        </div>
        <div className="col">
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
                    <Like
                      isLiked={movie.isLiked}
                      onLike={() => this.handleLike(movie)}
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => this.handleDelete(movie)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            itemsCount={moviesOfGenre.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
