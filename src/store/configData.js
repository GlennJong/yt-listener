import { createSlice } from "@reduxjs/toolkit";

function updateLocalStorage(key) {
  localStorage.setItem('translatorKey', key);
}

// localStorage data
let storageTranslatorKey = window.localStorage.getItem('translatorKey') || null;

const configData = createSlice({
    name: 'configData',
    initialState: {
      'translatorKey': storageTranslatorKey
    },
    reducers: {
      updateTranslatorKey: (state, action) => {
        state.translatorKey = action.payload;
        updateLocalStorage(action.payload);
      }
    }
});

export default configData;
