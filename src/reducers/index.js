import { combineReducers } from "redux";
import rateReducer from "./rateReducer";
import keywordReducer from "./keywordReducer";

export default combineReducers({
  rate: rateReducer,
  keywords: keywordReducer,
});
