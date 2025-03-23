import { Link } from "react-router-dom";
import css from "./MovieList.module.css";

export default function MovieList({ movies }) {
  if (!Array.isArray(movies) || movies.length === 0) {
    return <p>No movies found.</p>;
  }

  return (
    <ul className={css.ul}>
      {movies.map((movie) => (
        <li key={movie.id}>
          {movie.backdrop_path && (
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.backdrop_path}`}
              alt={movie.title}
            />
          )}
          <h3>{movie.title}</h3>
          <p>{movie.overview}</p>
          <Link to={`/movies/${movie.id}`}>Details</Link>
        </li>
      ))}
    </ul>
  );
}
