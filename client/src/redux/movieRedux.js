import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { movieApi } from "../api";

export const getMovies = createAsyncThunk("movies/getMovies", async (item) => {
  try {
    const response = await movieApi.movies(
      item.selection,
      item.exclude,
      item.page
    );

    return response;
  } catch (error) {
    return error;
  }
});

export const getRecommened = createAsyncThunk(
  "movies/getRecommened",
  async (id) => {
    try {
      const response = await movieApi.recommended(id);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getSearch = createAsyncThunk("movies/search", async (search) => {
  try {
    const response = await movieApi.search(search.keyword, search.page);

    return response;
  } catch (error) {
    return error;
  }
});

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    page: 1,
    total_pages: 1,
    total_results: 1,
    results: [],
    search: [],
    recommended: [],
    loading: true,
  },
  extraReducers: {
    [getMovies.pending]: (state) => {
      state.loading = true;
    },
    [getMovies.fulfilled]: (state, action) => {
      state.loading = false;
      state.page = action.payload.page;
      state.total_pages = action.payload.total_pages;
      state.total_results = action.payload.total_results;
      state.results = action.payload.results;
    },
    [getMovies.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getRecommened.pending]: (state) => {
      state.loading = true;
    },
    [getRecommened.fulfilled]: (state, action) => {
      state.loading = false;
      state.page = action.payload.page;
      state.recommended = action.payload.results;
    },
    [getRecommened.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [getSearch.pending]: (state) => {
      state.loading = true;
    },
    [getSearch.fulfilled]: (state, action) => {
      state.loading = false;
      state.page = action.payload.page;
      state.total_pages = action.payload.total_pages;
      state.total_results = action.payload.total_results;
      state.search = action.payload.results;
    },
    [getSearch.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default moviesSlice.reducer;
