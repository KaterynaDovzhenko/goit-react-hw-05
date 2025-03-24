import { Link, useLocation } from "react-router-dom";
import { useRef } from "react";
import css from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  const location = useLocation();
  const prevLocation = useRef(location.state?.from || "/movies");

  return (
    <div>
      <div className={css.errorPage}>
        <div>
          <h1 data-h1="404">404</h1>
          <p data-p="PAGE NOT FOUND">PAGE NOT FOUND</p>
        </div>
        <div id="particles-js"></div>
      </div>

      <Link className={css.btn} to={prevLocation.current}>
        go back :/
      </Link>
    </div>
  );
}
