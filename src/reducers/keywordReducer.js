// Action types
const ADD_KEYWORD = "ADD_KEYWORD";
const REMOVE_KEYWORD = "REMOVE_KEYWORD";

// Action creators
export const addKeyword = (keyword) => {
  return (dispatch) => {
    dispatch({
      type: ADD_KEYWORD,
      payload: {
        keyword,
      },
    });
  };
};

export const removeKeyword = (keyword) => {
  return (dispatch) => {
    dispatch({
      type: REMOVE_KEYWORD,
      payload: {
        keyword,
      },
    });
  };
};

// State
const initialState = {
  myKeywords: [],
};

// Reducer
const reducer = (state = initialState, action) => {
  if (action.type === ADD_KEYWORD) {
    let thisMovie = action.payload.keyword.movieId;
    let added = {
      id: action.payload.keyword.id,
      name: action.payload.keyword.name,
      movies: [thisMovie],
    };

    let newKeywords = [...state.myKeywords];

    //see if added keyword exists in myKeywords
    let exists = newKeywords.find((item) => item.id === added.id);

    if (exists) {
      let newMovies = [...exists.movies];
      let index = newKeywords.findIndex((item) => item.id === exists.id);
      // if this movie is in exists, remove this movie id from the movies array
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
      newKeywords = [...newKeywords, added];
    }

    return { ...state, myKeywords: newKeywords };
  }

  if (action.type === REMOVE_KEYWORD) {
    let thisitem = action.payload.keyword;
    let newKeywords = [...state.myKeywords];
    newKeywords = newKeywords.filter((f) => f.id !== thisitem.id);

    return { ...state, myKeywords: newKeywords };
  }

  return state;
};

export default reducer;
