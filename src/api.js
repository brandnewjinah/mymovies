import axios from "axios";

const TMDB_KEY = process.env.REACT_APP_API;
let random = Math.floor((Math.random() + 0.1) * 11);

const makeRequest = (path, params) =>
  axios.get(`https://api.themoviedb.org/3${path}`, {
    params: {
      ...params,
      api_key: TMDB_KEY,
    },
  });

const getAnything = async (path, params = {}) => {
  try {
    const {
      data: { results },
      data,
    } = await makeRequest(path, params);
    return [results || data, null];
  } catch (e) {
    console.log(e);
    return [null, e];
  }
};

export const movieApi = {
  genre: () => getAnything("/genre/movie/list"),
  topRated: (page) => getAnything("/movie/top_rated", { page }),
  discover: (genres, keyword, director) =>
    getAnything(`/discover/movie`, {
      with_genres: genres,
      with_keywords: keyword,
      with_crew: director,
      page: random,
      sort_by: "vote_count.desc",
    }),
  recommend: (id) =>
    getAnything(`/movie/${id}/recommendations`, { movie_id: id }),

  nowPlaying: () => getAnything("/movie/now_playing"),
  popular: () => getAnything("/movie/popular"),
  upcoming: () => getAnything("/movie/upcoming"),
  movie: (id) => getAnything(`/movie/${id}`, { append_to_response: "videos" }),
  similar: (id) => getAnything(`/movie/${id}/similar`, { movie_id: id }),

  discoverKeyword: (id, page) =>
    getAnything(`/discover/movie`, {
      with_keywords: id,
      page: page,
      sort_by: "vote_count.desc",
    }),
  discoverCrew: (id, page) =>
    getAnything(`/discover/movie`, {
      with_crew: id,
      page: page,
      sort_by: "vote_count.desc",
    }),
  foreign: (id) =>
    getAnything(`/discover/movie`, {
      with_original_language: id,
      // sort_by: "vote_count.desc",
    }),
  rate: (selection, exclude, page) =>
    getAnything(`/discover/movie`, {
      sort_by: selection,
      without_genres: exclude,
      page: page,
      "vote_count.gte": 10,
    }),
  keyword: (id) => getAnything(`/movie/${id}/keywords`),
  keywordlist: (id) => getAnything(`/keyword/${id}`),
  credits: (id) => getAnything(`/movie/${id}/credits`),
  person: (id) => getAnything(`/person/${id}`),
  search: (query) => getAnything("/search/movie", { query }),
};

export const tvApi = {
  today: () => getAnything("/tv/airing_today"),
  popular: () => getAnything("/tv/popular"),
  topRated: () => getAnything("/tv/top_rated"),
  thisWeek: () => getAnything("/tv/on_the_air"),
  show: (id) => getAnything(`/tv/${id}`, { append_to_response: "vidoes" }),
  similar: (id) => getAnything(`/tv/${id}/similar`),
  recommend: (id) => getAnything(`/tv/${id}/recommendations`, { tv_id: id }),
  search: (query) => getAnything("/search/tv", { query }),
};
