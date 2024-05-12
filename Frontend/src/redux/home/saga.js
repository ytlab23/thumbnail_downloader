import { put, takeEvery, all } from "redux-saga/effects";
import axios from "axios";
import { setSearchResults, setErrorMessage } from "./homeState";

function extractVideoId(url) {
  const regex =
    /^(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:watch\?|v|e(?:mbed)?)\/|\S*?[?&]v=|live\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  // /^(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:watch\?|v|e(?:mbed)?)\/|\S*?[?&]v=|live\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

function* handleSearchSubmit(action) {
  try {
    const { searchQuery } = action.payload;
    const API_KEYS = [
      "AIzaSyBfE7oaat7qJeMw4BvcKfy54FP4sBU-YTk",
      "AIzaSyDXyPEM65vKoGhdVGWGuSrE4xJWMVZEtxw",
      "AIzaSyD3KFJ4FAEAqd-ABPRyZvUCqGAn-74b1qg",
    ];
    let keyIndex = sessionStorage.getItem("keyIndex") || 0;
    // const params = new URLSearchParams(new URL(searchQuery).search);
    const videoId = extractVideoId(searchQuery);

    sessionStorage.setItem("videoId", videoId);
    const response = yield axios.get(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${API_KEYS[keyIndex]}`
    );
    if (response.data.items.length === 0) {
      yield put(setErrorMessage("Please enter a valid YouTube video URL."));
    } else {
      yield put(setSearchResults(response.data.items[0]));
    }
    // Rotate the API key for the next request
    keyIndex = (keyIndex + 1) % API_KEYS.length;
    sessionStorage.setItem("keyIndex", keyIndex);
  } catch (error) {
    setErrorMessage("Please enter a valid YouTube video URL.");
  }
}

export default function* rootSaga() {
  yield all([takeEvery("home/getSearchResults", handleSearchSubmit)]);
}
