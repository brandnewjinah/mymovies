import React from "react";
import ReactDOM from "react-dom";
import Routes from "./Routes";
import "./index.css";
import GlobalStyles from "./components/GlobalStyles";

//redux
import { Provider } from "react-redux";
import createStore from "./Store";
import { PersistGate } from "redux-persist/es/integration/react";

const { store, persistor } = createStore();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Routes />
      <GlobalStyles />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
