import axios from "axios";

const api_key = `fd63f20a6b226d23d8a35324d224e817`;

export const fetchMovies = async () => {
  try {
    let url = "https://api.themoviedb.org/3/movie/top_rated";
    let params = {
      api_key: api_key,
      language: "en-US",
      page: 1,
    };
    const response = await axios.get(url, { params });
    return response.data.results;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMoviesSearch = async (value) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie`,
    {
      params: {
        api_key: api_key,
        language: "en-US",
        page: 1,
        query: value,
      },
    }
  );
  console.log(response.data.results);
  return response.data.results;
};

export const fetchMoviesByID = async (movieId) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}`,
    {
      params: {
        api_key: api_key,
      },
    }
  );
  return response.data;
};

export const fetchMovieCast = async (movieId) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/credits`,
    {
      params: {
        api_key: api_key,
      },
    }
  );
  return response.data.cast;
};

export const fetchMovieReviews = async (movieId) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
    {
      params: {
        api_key: api_key,
      },
    }
  );
  return response.data.results;
};
