import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  fetchMoviesByID,
  fetchMovieCast,
  fetchMovieReviews,
} from "../MovieSearch";
import MovieCast from "../components/MovieCast/MovieCast";
import MovieReviews from "../components/MovieReviews/MovieReviews";
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
  const [selectedTab, setSelectedTab] = useState("");
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function getMovie() {
      try {
        setIsLoading(true);
        setError(false);

        const data = await fetchMoviesByID(movieId);
        setMovie(data);

        const dataCast = await fetchMovieCast(movieId);
        setCast(dataCast);

        const dataReviews = await fetchMovieReviews(movieId);
        setReviews(dataReviews);
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
      {error && <NotFoundPage></NotFoundPage>}
      <Link className={css.btn} to="/">
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
              <NavLink
                className={linkClass}
                to="#"
                onClick={() => setSelectedTab("cast")}
              >
                Cast
              </NavLink>
            </li>
            <li className={css.menu}>
              <NavLink
                className={linkClass}
                to="#"
                onClick={() => setSelectedTab("reviews")}
              >
                Reviews
              </NavLink>
            </li>
          </ul>
          <div>
            {selectedTab === "cast" && <MovieCast cast={cast} />}
            {selectedTab === "reviews" && <MovieReviews reviews={reviews} />}
          </div>
        </div>
      )}
    </div>
  );
}
