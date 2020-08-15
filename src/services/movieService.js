import http from "./htttpServices";
import { apiUrl } from "../config.json";

const apiEndPoint = apiUrl + "/movies";
function movieUrl(id) {
  return apiEndPoint + "/" + id;
}

export function getMovies() {
  return http.get(apiEndPoint);
}
export function getMovie(movieId) {
  return http.get(movieUrl(movieId));
}

export function saveMovie(movie) {
  //  either create or update !
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(movieUrl(movie._id), body);
  }
  return http.post(apiEndPoint, movie);
}
export function deleteMovie(movieId) {
  return http.delete(movieUrl(movieId));
}
