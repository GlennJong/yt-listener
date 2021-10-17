import { createSlice } from "@reduxjs/toolkit";

function updateTranslatorKeyToLocalStorage(key) {
  localStorage.setItem('translatorKey', key);
}

function updateYoutubeKeyToLocalStorage(key) {
  localStorage.setItem('youtubeKey', key);
}

// localStorage data
const storageTranslatorKey = window.localStorage.getItem('translatorKey') || null;
const storageYoutubeKey = window.localStorage.getItem('youtubeKey') || null;

// store
const configData = createSlice({
    name: 'configData',
    initialState: {
      'translatorKey': storageTranslatorKey,
      'youtubeKey': storageYoutubeKey
    },
    reducers: {
      updateTranslatorKey: (state, action) => {
        state.translatorKey = action.payload;
        updateTranslatorKeyToLocalStorage(action.payload);
      },
      updateYoutubeKey: (state, action) => {
        state.youtubeKey = action.payload;
        updateYoutubeKeyToLocalStorage(action.payload);
      }
    }
});

export default configData;
