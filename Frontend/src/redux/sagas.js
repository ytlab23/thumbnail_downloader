import { all } from "redux-saga/effects";
import home from "./home/saga";

export default function* rootSaga() {
  yield all([home()]);
}
