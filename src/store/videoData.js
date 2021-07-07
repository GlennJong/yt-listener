import { createSlice } from "@reduxjs/toolkit";

function updateLocalStorage(data) {
  localStorage.setItem('videoHistory', JSON.stringify(data));
  console.log('save')
}

// localStorage data
let storeData = window.localStorage.getItem('videoHistory') || null;
storeData = storeData ? JSON.parse(storeData) : [];

const videoData = createSlice({
    name: 'videoData',
    initialState: {
      'id': null,
      'history': storeData
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
      }
    }
});

export default videoData;
