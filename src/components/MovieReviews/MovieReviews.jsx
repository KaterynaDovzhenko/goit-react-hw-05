import css from "./MovieReviews.module.css";

export default function MovieReviews({ reviews }) {
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
