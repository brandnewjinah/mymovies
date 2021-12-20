import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { movieApi } from "../api";

export const basedOnLikedMovie = createAsyncThunk(
  "recommend/basedOnLikedMovie",
  async (id) => {
    try {
      const response = await movieApi.recommended(id);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const basedOnLikedMovie2 = createAsyncThunk(
  "recommend/basedOnLikedMovie2",
  async (id) => {
    try {
      const response = await movieApi.recommended(id);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const basedOnLikedGenre = createAsyncThunk(
  "recommend/basedOnLikedGenre",
  async (topGenre) => {
    try {
      const response = await movieApi.discoverByGenre(topGenre, null);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const basedOnLikedKeyword = createAsyncThunk(
  "recommend/basedOnLikedKeyword",
  async (id) => {
    try {
      const response = await movieApi.discoverByKeyword(id, null);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const basedOnLikedKeyword2 = createAsyncThunk(
  "recommend/basedOnLikedKeyword2",
  async (id) => {
    try {
      const response = await movieApi.discoverByKeyword(id, null);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const basedOnLikedKeywordAndGenre = createAsyncThunk(
  "recommend/basedOnLikedKeywordAndGenre",
  async (obj) => {
    try {
      const response = await movieApi.discover(obj.genre, obj.keyword);
      return response;
    } catch (error) {
      return error;
    }
  }
);

const recommendSlice = createSlice({
  name: "recommend",
  initialState: {
    page: 1,
    basedOnLiked: [],
    basedOnLiked2: [],
    basedOnGenre: [],
    basedOnKeyword: [],
    basedOnKeyword2: [],
    basedOnKeywordAndGenre: [],
    loading: true,
  },
  extraReducers: {
    [basedOnLikedMovie.pending]: (state) => {
      state.loading = true;
    },
    [basedOnLikedMovie.fulfilled]: (state, action) => {
      state.loading = false;
      state.page = action.payload.page;
      state.basedOnLiked = action.payload.results;
    },
    [basedOnLikedMovie.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [basedOnLikedMovie2.pending]: (state) => {
      state.loading = true;
    },
    [basedOnLikedMovie2.fulfilled]: (state, action) => {
      state.loading = false;
      state.page = action.payload.page;
      state.basedOnLiked2 = action.payload.results;
    },
    [basedOnLikedMovie2.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [basedOnLikedGenre.pending]: (state) => {
      state.loading = true;
    },
    [basedOnLikedGenre.fulfilled]: (state, action) => {
      state.loading = false;
      state.page = action.payload.page;
      state.basedOnGenre = action.payload.results;
    },
    [basedOnLikedGenre.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [basedOnLikedKeyword.pending]: (state) => {
      state.loading = true;
    },
    [basedOnLikedKeyword.fulfilled]: (state, action) => {
      state.loading = false;
      state.page = action.payload.page;
      state.basedOnKeyword = action.payload.results;
    },
    [basedOnLikedKeyword.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [basedOnLikedKeyword2.pending]: (state) => {
      state.loading = true;
    },
    [basedOnLikedKeyword2.fulfilled]: (state, action) => {
      state.loading = false;
      state.page = action.payload.page;
      state.basedOnKeyword2 = action.payload.results;
    },
    [basedOnLikedKeyword2.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [basedOnLikedKeywordAndGenre.pending]: (state) => {
      state.loading = true;
    },
    [basedOnLikedKeywordAndGenre.fulfilled]: (state, action) => {
      state.loading = false;
      state.page = action.payload.page;
      state.basedOnKeywordAndGenre = action.payload.results;
    },
    [basedOnLikedKeywordAndGenre.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default recommendSlice.reducer;
