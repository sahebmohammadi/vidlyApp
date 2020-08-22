import React, { Component } from "react";
import { getMovies ,deleteMovie} from "../services/movieService";
import { getGenres } from "../services/genreService";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import MoviesTable from "./moviesTable";
import { Link } from "react-router-dom";
import SearchBox from "./searchBox";
import _ from "lodash";
import {toast} from "react-toastify";
class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    sortColumn: { path: "title", order: "asc" },
    searchQuery: "",
    activedGenre: null,
  };
  async componentDidMount() {
    const {data} = await getGenres() ;
    const genres = [{ _id: null, name: "All Genres" }, ...data];
    const {data:movies} = await getMovies();
    this.setState({ genres, movies:movies});
  }
  handleActiveGenre = (item) => {
    this.setState({ activedGenre: item, searchQuery: "", currentPage: 1 });
  };
  handleSearch = (query) => {
    this.setState({
      searchQuery: query,
      activedGenre: null,
      currentPage: 1,
    });
  };

  handleDelete = async(movie) => {
    const origionalMovies = this.state.movies;
    const deletedMovie = origionalMovies.filter((m) => m._id !== movie._id);

    this.setState({
      movies: deletedMovie,
    });
    try{
      await deleteMovie(movie._id);
    }
    catch(ex){
      if (ex.response && ex.response.status === 404){
        toast.error("the movie has already been deleted !");
      }
      this.setState({movies:origionalMovies});
    }
  };
  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn: sortColumn });
  };
  getPagedDate = () => {
    const {
      pageSize,
      currentPage,
      activedGenre,
      movies: allMovies,
      sortColumn,
      searchQuery,
    } = this.state;
    // for search box :
    let filteredMovies = allMovies;
    if (searchQuery)
      filteredMovies = allMovies.filter((m) =>
      m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (activedGenre && activedGenre._id)
      filteredMovies = allMovies.filter(
        (m) => m.genre._id === activedGenre._id
      );

    // const filteredMovies =
    //   activedGenre && activedGenre._id
    //     ? allMovies.filter((m) => m.genre._id == activedGenre._id)
    //     : allMovies;
    const sortedFilteredMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );
    const movies = paginate(sortedFilteredMovies, currentPage, pageSize);
    return { data: movies, totalCount: filteredMovies.length };
  };
  render() {
    const {
      pageSize,
      currentPage,
      activedGenre,
      sortColumn,
      genres,
      searchQuery,
    } = this.state;

    const { length: count } = this.state.movies;
    if (count === 0) return <h3>ooops! there are no movies in database</h3>;

    const { totalCount, data: movies } = this.getPagedDate();

    return (
      <>
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={genres}
              onActiveItem={this.handleActiveGenre}
              activedItem={activedGenre}
            />
          </div>
          <div className="col-9">
            <Link
              className="btn btn-primary m-2"
              style={{ color: "white" }}
              to="movies/new"
            >
              New Movive
            </Link>
            <h3> there are {totalCount} movie in the database.</h3>
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
            <MoviesTable
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              movies={movies}
              onSort={this.handleSort}
              sortColumn={sortColumn}
            />
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </>
    );
  }
}

export default Movies;
