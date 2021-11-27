import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { movieApi } from "../api";

export const getGenres = createAsyncThunk("genres/getGenres", async () => {
  try {
    const response = await movieApi.genres();
    return response;
  } catch (error) {
    return error;
  }
});

const genreSlice = createSlice({
  name: "genres",
  initialState: {
    genres: [],
    loading: true,
  },
  extraReducers: {
    [getGenres.pending]: (state) => {
      state.loading = true;
    },
    [getGenres.fulfilled]: (state, action) => {
      state.loading = false;
      state.genres = action.payload.genres;
    },
    [getGenres.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default genreSlice.reducer;
