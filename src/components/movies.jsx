import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import MoviesTable from "./moviesTable";

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
          <MoviesTable
            moviesOfGenre={moviesOfGenre}
            moviesDisplayed={moviesDisplayed}
            onDelete={this.handleDelete}
            onLike={this.handleLike}
          />
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
