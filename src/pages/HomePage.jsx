import { useEffect, useState } from "react";
import { fetchMovies } from "../MovieSearch";
import NotFoundPage from "./NotFoundPage";
import MovieList from "../components/MovieList/MovieList";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getTopMovies() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchMovies();
        setMovies(data);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getTopMovies();
  }, []);

  return (
    <main>
      <h1>Welcome!</h1>
      <p>Enjoy sth whatever</p>
      {loading && <p>Loading movies...</p>}
      {error && <NotFoundPage></NotFoundPage>}
      {movies && movies.length > 0 ? (
        <MovieList movies={movies}></MovieList>
      ) : (
        <p>Not found</p>
      )}
    </main>
  );
}
