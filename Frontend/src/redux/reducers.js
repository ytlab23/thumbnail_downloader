import { combineReducers } from "redux";
import homeReducer from "./home/homeState";

const rootReducer = combineReducers({
  home: homeReducer,
  // Add other reducers here
});

export default rootReducer;
