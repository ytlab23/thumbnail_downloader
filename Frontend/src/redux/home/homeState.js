import { createSlice } from "@reduxjs/toolkit";

export const homeSlice = createSlice({
  name: "home",
  initialState: {
    searchResults: [],
    errorMessage: "",
  },
  reducers: {
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    getSearchResults: (state, action) => {},
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
  },
});

export const { getSearchResults, setSearchResults, setErrorMessage } =
  homeSlice.actions;
export default homeSlice.reducer;
