import { useEffect, useState, UseState } from "react";
import { Toaster } from "react-hot-toast";
import { fetchMovies } from "../MovieSearch";
import MovieList from "../components/MovieList/MovieList";
import NotFoundPage from "./NotFoundPage";
import SearchBar from "../components/SearchBar/SearchBar";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchMovie, setSearchMovie] = useState("");

  const handleSearch = (value) => {
    setSearchMovie(value);
    setMovies([]);
  };

  useEffect(() => {
    async function getMovies() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchMovies(searchMovie);
        setMovies((prevMovies) => {
          return [...prevMovies, ...data];
        });
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getMovies();
  }, [searchMovie]);
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
