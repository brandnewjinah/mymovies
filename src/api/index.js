import axios from "axios";

const TMDB_KEY = process.env.REACT_APP_API;
const URL = "https://api.themoviedb.org/3";
let random = Math.floor((Math.random() + 0.1) * 11);

const makeRequest = (path, params) =>
  axios.get(`${URL}${path}`, {
    params: {
      ...params,
      api_key: TMDB_KEY,
    },
  });

const getData = async (path, params = {}) => {
  try {
    const { data } = await makeRequest(path, params);
    return data;
  } catch (error) {
    return error;
  }
};

export const movieApi = {
  genres: () => getData("/genre/movie/list"),
  movies: (selection, exclude, page) =>
    getData(`/discover/movie`, {
      sort_by: selection,
      without_genres: exclude,
      page: page,
      "vote_count.gte": 10,
    }),
  credits: (id) => getData(`/movie/${id}/credits`),
  movieDetails: (id) =>
    getData(`/movie/${id}`, { append_to_response: "videos" }),
  recommended: (id) =>
    getData(`/movie/${id}/recommendations`, { movie_id: id }),
  person: (id) => getData(`/person/${id}`),
  keywordsForMovie: (id) => getData(`/movie/${id}/keywords`),
  keyword: (id) => getData(`/keyword/${id}`),
  discoverByGenre: (genres) =>
    getData(`/discover/movie`, {
      with_genres: genres,
      page: random,
      sort_by: "vote_count.desc",
    }),
  discover: (genres, keyword) =>
    getData(`/discover/movie`, {
      with_genres: genres,
      with_keywords: keyword,
      page: 1,
      sort_by: "vote_count.desc",
    }),
  discoverByCrew: (id, page) =>
    getData(`/discover/movie`, {
      with_crew: id,
      page: page,
      sort_by: "vote_count.desc",
    }),
  discoverByKeyword: (id, page) =>
    getData(`/discover/movie`, {
      with_keywords: id,
      page: page,
      sort_by: "vote_count.desc",
    }),

  search: (query, page) => getData("/search/movie", { query, page }),
};
