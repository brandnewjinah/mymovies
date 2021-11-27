import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { movieApi } from "../api";

export const getMovieDetails = createAsyncThunk(
  "details/getMovieDetails",
  async (id) => {
    try {
      const response = await movieApi.movieDetails(id);
      return response;
    } catch (error) {
      return error;
    }
  }
);

const detailsSlice = createSlice({
  name: "details",
  initialState: {
    loading: true,
    genres: [],
    homepage: "",
    id: 0,
    imdb_id: "",
    original_language: "",
    original_title: "",
    overview: "",
    poster_path: "",
    release_date: "",
    runtime: 0,
    title: "",
    vote_average: 0,
    vote_count: 0,
    videos: {},
  },
  extraReducers: {
    [getMovieDetails.pending]: (state) => {
      state.loading = true;
    },
    [getMovieDetails.fulfilled]: (state, action) => {
      state.loading = false;
      state.genres = action.payload.genres;
      state.homepage = action.payload.homepage;
      state.id = action.payload.id;
      state.imdb_id = action.payload.imdb_id;
      state.original_language = action.payload.original_language;
      state.original_title = action.payload.original_title;
      state.overview = action.payload.overview;
      state.poster_path = action.payload.poster_path;
      state.release_date = action.payload.release_date;
      state.runtime = action.payload.runtime;
      state.title = action.payload.title;
      state.vote_average = action.payload.vote_average;
      state.vote_count = action.payload.vote_count;
      state.videos = action.payload.videos;
    },
    [getMovieDetails.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default detailsSlice.reducer;
