import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { movieApi } from "../api";

export const likeMovie = createAsyncThunk("rate/likeMovie", async (id) => {
  try {
    const response = await movieApi.movieDetails(id);
    const credit = await movieApi.credits(id);
    const director =
      credit && credit.crew && credit.crew.find((c) => c.job === "Director");

    return {
      ...response,
      director: { id: director.id, name: director.name },
    };
  } catch (error) {
    return error;
  }
});

export const dislikeMovie = createAsyncThunk(
  "rate/dislikeMovie",
  async (id) => {
    try {
      const response = await movieApi.movieDetails(id);
      const credit = await movieApi.credits(id);
      const director =
        credit && credit.crew && credit.crew.find((c) => c.job === "Director");

      return {
        ...response,
        director: { id: director.id, name: director.name },
      };
    } catch (error) {
      return error;
    }
  }
);

const rateSlice = createSlice({
  name: "rate",
  initialState: {
    liked: [],
    disliked: [],
    loading: true,
  },

  extraReducers: {
    [likeMovie.pending]: (state) => {
      state.loading = true;
    },
    [likeMovie.fulfilled]: (state, action) => {
      let added = action.payload;
      let newLikes = [...state.liked];
      let newDislikes = [...state.disliked];

      //look for duplicate first
      let duplicate = newLikes.find((item) => item.id === added.id);

      if (duplicate) {
        newLikes = newLikes.filter((f) => f.id !== added.id);
      } else {
        newDislikes = newDislikes.filter((f) => f.id !== added.id);
        newLikes = [...newLikes, added];
      }
      return { ...state, liked: newLikes, disliked: newDislikes };
    },
    [likeMovie.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [dislikeMovie.pending]: (state) => {
      state.loading = true;
    },
    [dislikeMovie.fulfilled]: (state, action) => {
      let added = action.payload;
      let newDislikes = [...state.disliked];
      let newLikes = [...state.liked];

      //look for duplicate first
      let duplicate = newDislikes.find((item) => item.id === added.id);

      if (duplicate) {
        newDislikes = newDislikes.filter((f) => f.id !== added.id);
      } else {
        newLikes = newLikes.filter((f) => f.id !== added.id);
        newDislikes = [...newDislikes, added];
      }
      return { ...state, liked: newLikes, disliked: newDislikes };
    },
    [dislikeMovie.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default rateSlice.reducer;
