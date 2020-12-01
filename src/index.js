import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

//redux
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import createStore from "./store/store";

const { store, persistor } = createStore();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
