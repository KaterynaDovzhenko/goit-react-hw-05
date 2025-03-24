import { useEffect, useState } from "react";
import css from "./MovieCast.module.css";
import { fetchMovieCast } from "../../MovieSearch";
import { useParams } from "react-router-dom";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    async function getCast() {
      const data = await fetchMovieCast(movieId);
      setCast(data);
    }
    getCast();
  }, [movieId]);
  return (
    <ul className={css.ul}>
      {cast.length > 0 ? (
        cast.map((actor) => (
          <li key={actor.id} className={css.castItem}>
            {actor.profile_path && (
              <img
                className={css.actorImage}
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={actor.name}
              />
            )}
            <h4 className={css.actorName}>{actor.name}</h4>
            <p className={css.actorCharacter}>Character: {actor.character}</p>
          </li>
        ))
      ) : (
        <p>No cast information available.</p>
      )}
    </ul>
  );
}
