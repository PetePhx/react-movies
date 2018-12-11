import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/movies";

export function getMovies() {
  return http.get(apiEndpoint);
}

export function deleteMovie(movieId) {
  return http.delete(apiEndpoint + "/" + movieId);
}

export function getMovie(movieId) {
  return http.get(apiEndpoint + "/" + movieId);
}

export function saveMovie(movie) {
  if (movie._id) {
    const url = apiEndpoint + "/" + movie._id;
    delete movie._id;
    return http.put(url, movie);
  } else {
    const url = apiEndpoint;
    return http.post(url, movie);
  }
}
