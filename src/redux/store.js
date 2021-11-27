import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import genreReducer from "./genreRedux";
import movieReducer from "./movieRedux";
import detailsReducer from "./detailsRedux";
import rateReducer from "./rateRedux";
import categoryReducer from "./categoryRedux";
import keywordReducer from "./keywordRedux";
import recommendReducer from "./recommendRedux";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  genres: genreReducer,
  movie: movieReducer,
  details: detailsReducer,
  rate: rateReducer,
  category: categoryReducer,
  keyword: keywordReducer,
  recommend: recommendReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
