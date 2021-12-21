import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { movieApi } from "../api";
import { publicRequest } from "../api/local";

export const getPersonDetail = createAsyncThunk(
  "category/getPersonDetail",
  async (id) => {
    try {
      const response = await movieApi.person(id);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const discoverMoviesByCrew = createAsyncThunk(
  "category/discoverMoviesByCrew",
  async (obj) => {
    try {
      const response = await movieApi.discoverByCrew(obj.id, obj.page);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getKeyword = createAsyncThunk(
  "category/getKeyword",
  async (id) => {
    try {
      const response = await movieApi.keyword(id);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const discoverMoviesByKeyword = createAsyncThunk(
  "category/discoverMoviesByKeyword",
  async (obj) => {
    try {
      const response = await movieApi.discoverByKeyword(obj.id, obj.page);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const discoverMoviesByGenre = createAsyncThunk(
  "category/discoverMoviesByGenre",
  async (id) => {
    try {
      const response = await movieApi.discoverByGenre(id);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getACollection = createAsyncThunk(
  "category/getACollection",
  async (id) => {
    try {
      const { data } = await publicRequest.get(`/collections/${id}`);
      return data;
    } catch (error) {
      return error;
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    name: "",
    id: 0,
    page: 0,
    results: [],
    total_pages: 0,
    loading: true,
  },
  extraReducers: {
    [getPersonDetail.pending]: (state) => {
      state.loading = true;
    },
    [getPersonDetail.fulfilled]: (state, action) => {
      state.loading = false;
      state.name = action.payload.name;
      state.id = action.payload.id;
    },
    [getPersonDetail.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [discoverMoviesByCrew.pending]: (state) => {
      state.loading = true;
    },
    [discoverMoviesByCrew.fulfilled]: (state, action) => {
      state.loading = false;
      state.page = action.payload.page;
      state.results = action.payload.results;
      state.total_pages = action.payload.total_pages;
    },
    [discoverMoviesByCrew.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getKeyword.pending]: (state) => {
      state.loading = true;
    },
    [getKeyword.fulfilled]: (state, action) => {
      state.loading = false;
      state.name = action.payload.name;
      state.id = action.payload.id;
    },
    [getKeyword.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [discoverMoviesByKeyword.pending]: (state) => {
      state.loading = true;
    },
    [discoverMoviesByKeyword.fulfilled]: (state, action) => {
      state.loading = false;
      state.page = action.payload.page;
      state.results = action.payload.results;
      state.total_pages = action.payload.total_pages;
    },
    [discoverMoviesByKeyword.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [discoverMoviesByGenre.pending]: (state) => {
      state.loading = true;
    },
    [discoverMoviesByGenre.fulfilled]: (state, action) => {
      state.loading = false;
      state.page = action.payload.page;
      state.results = action.payload.results;
      state.total_pages = action.payload.total_pages;
    },
    [discoverMoviesByGenre.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getACollection.pending]: (state) => {
      state.loading = true;
    },
    [getACollection.fulfilled]: (state, action) => {
      state.loading = false;
      state.name = action.payload.name;
      state.results = action.payload.movies;
    },
    [getACollection.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default categorySlice.reducer;
