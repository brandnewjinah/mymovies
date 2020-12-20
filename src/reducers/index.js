import { combineReducers } from "redux";
import rateReducer from "./rateReducer";

export default combineReducers({
  rate: rateReducer,
});
