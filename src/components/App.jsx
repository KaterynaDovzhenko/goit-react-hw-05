import "./App.css";
import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
// import { useState } from "react";
import Navigation from "./Navigation/Navigation";
import NotFoundPage from "../pages/NotFoundPage";

const Home = lazy(() => import("../pages/HomePage"));
const MoviesPage = lazy(() => import("../pages/MoviesPage"));
const MovieDetailsPage = lazy(() => import("../pages/MovieDetailsPage"));
const MovieCast = lazy(() => import("./MovieCast/MovieCast"));
const MovieReviews = lazy(() => import("./MovieReviews/MovieReviews"));

function App() {
  return (
    <div>
      <Navigation />

      <Suspense>
        <Routes fallback={<div>Loading page...</div>}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/movies" element={<MoviesPage />}></Route>
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}></Route>
          <Route path="/movies/:movieId/cast" element={<MovieCast />}></Route>
          <Route
            path="/movies/:movieId/reviews"
            element={<MovieReviews />}
          ></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
