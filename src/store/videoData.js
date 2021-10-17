import { createSlice } from "@reduxjs/toolkit";

function updateLocalStorage(data) {
  localStorage.setItem('videoHistory', JSON.stringify(data));
}

// localStorage data
let storeData = window.localStorage.getItem('videoHistory') || null;
storeData = storeData ? JSON.parse(storeData) : [];

const videoData = createSlice({
    name: 'videoData',
    initialState: {
      'id': null,
      'history': storeData,
      'search': null
    },
    reducers: {
      clearVideoId: (state) => {
        state.id = null;
      },
      updateVideoId: (state, action) => {
        state.id = action.payload;
      },
      updateVideoHistory: (state, action) => {
        state.history = action.payload;
        updateLocalStorage(action.payload);
      },
      updateSearchResult: (state, action) => {
        state.search = action.payload;
      }
    }
});

export default videoData;
