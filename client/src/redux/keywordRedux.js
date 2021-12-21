import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { movieApi } from "../api";

export const getKeywords = createAsyncThunk(
  "keyword/getKeywords",
  async (id) => {
    try {
      const response = await movieApi.keywordsForMovie(id);
      return response;
    } catch (error) {
      return error;
    }
  }
);

const keywordSlice = createSlice({
  name: "keyword",
  initialState: {
    id: 0,
    keywords: [],
    myKeywords: [],
    loading: true,
  },
  reducers: {
    saveKeyword: (state, action) => {
      const thisMovie = action.payload.movieId;
      const thisKeyword = {
        id: action.payload.id,
        name: action.payload.name,
        movies: [thisMovie],
      };

      let newKeywords = [...state.myKeywords];

      //see if this keyword exists in myKeywords
      let exists = newKeywords.find((item) => item.id === thisKeyword.id);
      if (exists) {
        let newMovies = [...exists.movies];
        let index = newKeywords.findIndex((item) => item.id === exists.id);
        // if this movie is already added to this keyword, remove from the movies array
        if (exists.movies.includes(thisMovie)) {
          newMovies = newMovies.filter((f) => f !== thisMovie);
          //if newMovies.length === 0 ? remove this keyword
          if (newMovies.length === 0) {
            newKeywords = newKeywords.filter((f) => f.id !== exists.id);
          } else {
            exists = { ...exists, movies: newMovies };
            newKeywords[index] = exists;
          }
        } else {
          // if this movie is not in exists, add this movie id to the movies array
          newMovies = [...newMovies, thisMovie];
          exists = { ...exists, movies: newMovies };
          newKeywords[index] = exists;
        }
      } else {
        // first time adding
        newKeywords = [...newKeywords, thisKeyword];
      }
      return { ...state, myKeywords: newKeywords };
    },
  },
  extraReducers: {
    [getKeywords.pending]: (state) => {
      state.loading = true;
    },
    [getKeywords.fulfilled]: (state, action) => {
      state.loading = false;
      state.id = action.payload.id;
      state.keywords = action.payload.keywords;
    },
    [getKeywords.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { saveKeyword } = keywordSlice.actions;
export default keywordSlice.reducer;
