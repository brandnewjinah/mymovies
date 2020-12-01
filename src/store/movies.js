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
    let added = action.payload.movie;
    let newLikes = [...state.liked];

    //look for duplicate first
    let duplicate = newLikes.find((item) => item === added);

    if (duplicate) {
      return { ...state };
    } else {
      newLikes = [...newLikes, added];
      return { ...state, liked: newLikes };
    }
  }

  if (action.type === DISLIKE_ITEM) {
    let added = action.payload.movie;
    let newDislikes = [...state.disliked];

    //look for duplicate first
    let duplicate = newDislikes.find((item) => item === added);

    if (duplicate) {
      return { ...state };
    } else {
      newDislikes = [...newDislikes, added];
      return { ...state, disliked: newDislikes };
    }
  }

  // if (action.type === ADD_ITEM) {
  //   // 1. add one item to an empty cart
  //   // 2. add one item to an active cart
  //   // 3. add duplicate item

  //   let added = action.payload.movie;
  //   let newLikes = [...state.liked];
  //   let totalqty = state.qty;

  //   //look for duplicate first

  //   let duplicate = newLikes.find(
  //     (item) => item.product_id === added.product_id
  //   );
  //   if (duplicate) {
  //     let index = newLikes.findIndex(
  //       (item) => item.product_id === added.product_id
  //     );
  //     newLikes[index].qty += 1;
  //     return { ...state, items: newLikes, qty: totalqty + 1 };
  //   } else {
  //     newLikes = [...newLikes, { ...added, qty: 1 }];
  //     return { ...state, items: newLikes, qty: totalqty + 1 };
  //   }
  // }
  // if (action.type === REMOVE_ITEM) {
  //   const { qty } = state;
  //   return {
  //     ...state,
  //     items: state.items.filter(
  //       (item) => item.product_id !== action.payload.data.product_id
  //     ),
  //     qty: qty - action.payload.data.qty,
  //   };
  // }

  return state;
};

export default reducer;
