import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducer from "./movies";

//persist
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const initialStore = {
  qty: 0,
  liked: [],
  disliked: [],
};

const middleware = [thunk];
const persistedReducer = persistReducer(persistConfig, reducer);

export default () => {
  const store = createStore(
    persistedReducer,
    initialStore,
    composeWithDevTools(applyMiddleware(...middleware))
  );
  const persistor = persistStore(store);
  return { store, persistor };
};
