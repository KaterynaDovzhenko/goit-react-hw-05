import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { fetchMoviesSearch } from "../MovieSearch";
import MovieList from "../components/MovieList/MovieList";
import NotFoundPage from "./NotFoundPage";
import SearchBar from "../components/SearchBar/SearchBar";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const searchMovie = searchParams.get("query") || "";

  useEffect(() => {
    async function getMovies() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchMoviesSearch(searchMovie);
        setMovies(data);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getMovies();
  }, [searchMovie]);

  const handleSearch = (value) => {
    setSearchParams(value ? { query: value } : {});
    setMovies([]);
  };

  return (
    <div>
      <Toaster></Toaster>
      {isLoading && <p>Loading movies...</p>}
      {error && <NotFoundPage></NotFoundPage>}
      <SearchBar onSubmit={handleSearch}></SearchBar>
      {movies.length > 0 && <MovieList movies={movies}></MovieList>}
    </div>
  );
}
