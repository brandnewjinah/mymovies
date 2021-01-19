// Action types
const LIKE_ITEM = "LIKE_ITEM";
const DISLIKE_ITEM = "DISLIKE_ITEM";

// Action creators
export const likeItem = (movie) => {
  return (dispatch) => {
    dispatch({
      type: LIKE_ITEM,
      payload: {
        movie,
      },
    });
  };
};

export const dislikeItem = (movie) => {
  return (dispatch) => {
    dispatch({
      type: DISLIKE_ITEM,
      payload: {
        movie,
      },
    });
  };
};

// Reducer
const reducer = (state, action) => {
  if (action.type === LIKE_ITEM) {
    // let added = action.payload.movie;
    console.log("hi");
    // let newLikes = [...state.liked];
    // let newDislikes = [...state.disliked];

    // //look for duplicate first
    // let duplicate = newLikes.find((item) => item.id === added.id);

    // if (duplicate) {
    //   newLikes = newLikes.filter((f) => f.id !== added.id);
    // } else {
    //   newDislikes = newDislikes.filter((f) => f.id !== added.id);
    //   newLikes = [...newLikes, added];
    // }
    // return { ...state, liked: newLikes, disliked: newDislikes };
  }

  if (action.type === DISLIKE_ITEM) {
    let added = action.payload.movie;
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
  }

  return state;
};

export default reducer;
