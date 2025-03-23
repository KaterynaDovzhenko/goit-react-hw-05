import css from "./MovieCast.module.css";

export default function MovieCast({ cast }) {
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
