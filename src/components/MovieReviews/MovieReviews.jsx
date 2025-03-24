import { useParams } from "react-router-dom";
import css from "./MovieReviews.module.css";
import { useEffect, useState } from "react";
import { fetchMovieReviews } from "../../MovieSearch";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function getReviews() {
      const data = await fetchMovieReviews(movieId);
      setReviews(data);
    }
    getReviews();
  }, [movieId]);
  return (
    <ul className={css.ul}>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <li key={review.id}>
            <h4 className={css.reviewName}>Author: {review.author}</h4>
            <p>{review.content}</p>
          </li>
        ))
      ) : (
        <p className={css.noReviews}>No reviews found</p>
      )}
    </ul>
  );
}
