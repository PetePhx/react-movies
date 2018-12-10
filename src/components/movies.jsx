import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import MoviesTable from "./moviesTable";
import SearchBox from "./common/searchBox";
import _ from "lodash";

class Movies extends Component {
  allGenresObj = { _id: "0", name: "All Genres" };

  state = {
    movies: [],
    genres: [],
    selectedGenre: this.allGenresObj,
    titleFilter: "",
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" }
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [this.allGenresObj, ...data];

    const { data: movies } = await getMovies();

    this.setState({ movies, genres });

    this.setState({ selectedGenre: this.allGenresObj });
  }

  handleDelete = async movie => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter(mv => mv._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
    } catch (exc) {
      if (exc.response && exc.response.status === 404)
        toast.error("This movie has already been deleted.");

      this.setState({ movies: originalMovies });
    }
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
      titleFilter: "", // reset title filter
      currentPage: 1
    });
  };

  handleSearch = titleFilter => {
    this.setState({
      selectedGenre: this.allGenresObj, // reset genre selection
      titleFilter: titleFilter,
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

  filterMoviesByTitle = (movieArr, titleFilter) => {
    if (titleFilter === "") return movieArr;

    const re = new RegExp(titleFilter, "i");
    return movieArr.filter(movie => re.test(movie.title));
  };

  getPagedDate = () => {
    const {
      movies,
      selectedGenre,
      titleFilter,
      sortColumn,
      currentPage,
      pageSize
    } = this.state;

    const moviesOfGenre = this.filterMoviesByGenre(movies, selectedGenre);
    const moviesOfTitle = this.filterMoviesByTitle(moviesOfGenre, titleFilter);
    const moviesSorted = _.orderBy(
      moviesOfTitle,
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
      titleFilter,
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
          <Link to="/movies/new" className="btn btn-primary m-2">
            New Movie
          </Link>
          <p className="my-2">Showing {totalLength} movies:</p>
          <SearchBox value={titleFilter} onChange={this.handleSearch} />
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
