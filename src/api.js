// import axios from "axios";

// const TMDB_KEY = "4b658a749eb62093dc853c9e394cfcc7";

// const makeRequest = (path, params) => {
//   axios.get(`https://api.themoviedb.org/3${path}`, {
//     params: {
//       ...params,
//       api_key: TMDB_KEY,
//     },
//   });
// };

// const getAnything = async (path, params = {}) => {
//   try {
//     const {
//       data: { results },
//       data,
//     } = await makeRequest(path, params);
//     return [results || data, null];
//   } catch (e) {
//     console.log(e);
//     return [null, e];
//   }
// };

// export const movieApi = {
//   nowPlaying: () => getAnything("/movie/now_playing"),
//   popular: () => getAnything("/movie/popular"),
//   upcoming: () => getAnything("/movie/upcoming"),
//   topRated: () => getAnything("/movie/top_rated"),
//   details: (id) =>
//     getAnything(`/movie/${id}`, { append_to_response: "videos" }),
//   similar: (id) => getAnything(`/movie/${id}/similar`),
//   search: (query) => getAnything("/search/movie", { query }),
// };

// export const TVApi = {
//   airingTody: () => getAnything("/tv/airing_today"),
//   popular: () => getAnything("/tv/popular"),
//   onAir: () => getAnything("/tv/on_the_air"),
//   topRated: () => getAnything("/tv/top_rated"),
//   details: (id) => getAnything(`/tv/${id}`, { append_to_response: "videos" }),
//   similar: (id) => getAnything(`/tv/${id}/similar`),
//   search: (query) => getAnything("/search/tv", { query }),
// };

import axios from "axios";

const TMDB_KEY = "4b658a749eb62093dc853c9e394cfcc7";

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
  nowPlaying: () => getAnything("/movie/now_playing"),
  popular: () => getAnything("/movie/popular"),
  upcoming: () => getAnything("/movie/upcoming"),
  genre: () => getAnything("/genre/movie/list"),
  topRated: (page) => getAnything("/movie/top_rated", { page }),
  movie: (id) => getAnything(`/movie/${id}`, { append_to_response: "videos" }),
  similar: (id) => getAnything(`/movie/${id}/similar`),
  search: (query) => getAnything("/search/movie", { query }),
};

export const tvApi = {
  today: () => getAnything("/tv/airing_today"),
  popular: () => getAnything("/tv/popular"),
  topRated: () => getAnything("/tv/top_rated"),
  thisWeek: () => getAnything("/tv/on_the_air"),
  show: (id) => getAnything(`/tv/${id}`, { append_to_response: "vidoes" }),
  similar: (id) => getAnything(`/tv/${id}/similar`),
  search: (query) => getAnything("/search/tv", { query }),
};
