import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import MoviesTable from "./moviesTable";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    selectedGenre: null,
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" }
  };

  componentDidMount() {
    this.setState({
      movies: getMovies(),
      genres: [{ _id: "0", name: "All Genres" }, ...getGenres()]
    });

    this.setState({ selectedGenre: { _id: 0, name: "All Genres" } });
  }

  handleDelete = movie => {
    deleteMovie(movie._id);
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

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  filterMoviesByGenre = (movieArr, selGenre) => {
    if (selGenre.name === "All Genres") return movieArr;
    return movieArr.filter(movie => movie.genre.name === selGenre.name);
  };

  getPagedDate = () => {
    const {
      movies,
      selectedGenre,
      sortColumn,
      currentPage,
      pageSize
    } = this.state;

    const moviesOfGenre = this.filterMoviesByGenre(movies, selectedGenre);
    const moviesSorted = _.orderBy(
      moviesOfGenre,
      [sortColumn.path],
      [sortColumn.order]
    );
    const moviesDisplayed = paginate(moviesSorted, currentPage, pageSize);

    return { totalLength: moviesSorted.length, movies: moviesDisplayed };
  };

  render() {
    const {
      genres,
      currentPage,
      pageSize,
      selectedGenre,
      sortColumn
    } = this.state;

    if (this.state.movies.length === 0)
      return <p>There are no movies in the database!</p>;

    const { totalLength, movies } = this.getPagedDate();

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
          {/* <button className="btn btn-primary"> */}
          <Link to="/movies/new" className="btn btn-primary m-2">
            New Movie
          </Link>
          {/* </button> */}
          <p>Showing {totalLength} movies:</p>
          <MoviesTable
            movies={movies}
            onDelete={this.handleDelete}
            onLike={this.handleLike}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />
          <Pagination
            itemsCount={totalLength}
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
