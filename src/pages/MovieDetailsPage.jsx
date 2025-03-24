import { useEffect, useState, useRef } from "react";
import {
  NavLink,
  Link,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { fetchMoviesByID } from "../MovieSearch";
import NotFoundPage from "./NotFoundPage";
import clsx from "clsx";
import css from "./MovieDetailsPage.module.css";

const linkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const location = useLocation();
  const prevLocation = useRef(location.state?.from ?? "/movies");

  useEffect(() => {
    async function getMovie() {
      try {
        setIsLoading(true);
        setError(false);

        const data = await fetchMoviesByID(movieId);
        setMovie(data);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getMovie();
  }, [movieId]);

  return (
    <div className={css.movieDetailsContainer}>
      {isLoading && <p>Loading movies...</p>}
      {error && <NotFoundPage />}
      <Link className={css.btn} to={prevLocation.current}>
        go back
      </Link>
      {movie && (
        <div key={movie.id}>
          {movie.backdrop_path && (
            <img
              className={css.movieImage}
              src={`https://image.tmdb.org/t/p/w200${movie.backdrop_path}`}
              alt={movie.title}
            />
          )}
          <h3>{movie.title}</h3>
          <p className={css.rate}>Rate {movie.vote_average}</p>
          <h4>Overview</h4>
          <p>{movie.overview}</p>
          <h4>Additional Information</h4>
          <ul className={css.tabList}>
            <li className={css.menu}>
              <NavLink className={linkClass} to="cast">
                Cast
              </NavLink>
            </li>
            <li className={css.menu}>
              <NavLink className={linkClass} to="reviews">
                Reviews
              </NavLink>
            </li>
          </ul>
          <Outlet />
        </div>
      )}
    </div>
  );
}
