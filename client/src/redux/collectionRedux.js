import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { publicRequest } from "../api/local";

export const getCollections = createAsyncThunk(
  "suggest/getCollections",
  async () => {
    try {
      const { data } = await publicRequest.get("/collections");
      return data;
    } catch (error) {
      return error;
    }
  }
);

const collectionSlice = createSlice({
  name: "collection",
  initialState: {
    collections: [],
    loading: false,
  },
  extraReducers: {
    [getCollections.pending]: (state) => {
      state.loading = true;
    },
    [getCollections.fulfilled]: (state, action) => {
      state.loading = false;
      state.collections = action.payload;
    },
    [getCollections.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default collectionSlice.reducer;
