import { createSlice } from "@reduxjs/toolkit";

const YOUTUBE_API_KEY = import.meta.env['VITE_YOUTUBE_API_KEY'];
const TRANSCRIPT_GETTER_ENDPOINT = import.meta.env['VITE_TRANSCRIPT_GETTER_ENDPOINT'];
const TRANSCRIPT_TOKEN = import.meta.env['VITE_TRANSCRIPT_TOKEN'];


function updateTranslatorKeyToLocalStorage(value) {
  localStorage.setItem('translatorKey', value);
}

function updateYoutubeKeyToLocalStorage(value) {
  localStorage.setItem('youtubeKey', value);
}

function updateTranscriptGetterEndpointToLocalStorage(value) {
  localStorage.setItem('transcriptGetterEndpoint', value);
}

function updateTranscriptTokenToLocalStorage(value) {
  localStorage.setItem('transcriptToken', value);
}

// localStorage data
const storageTranscriptGetterEndpoint = window.localStorage.getItem('transcriptGetterEndpoint') || null;
const storageTranscriptToken = window.localStorage.getItem('transcriptToken') || null;
const storageTranslatorKey = window.localStorage.getItem('translatorKey') || null;
const storageYoutubeKey = window.localStorage.getItem('youtubeKey') || null;


// store
const configData = createSlice({
    name: 'configData',
    initialState: {
      'translatorKey': storageTranslatorKey,
      'transcriptToken': storageTranscriptToken || TRANSCRIPT_TOKEN,
      'transcriptGetterEndpoint': storageTranscriptGetterEndpoint || TRANSCRIPT_GETTER_ENDPOINT,
      'youtubeKey': storageYoutubeKey || YOUTUBE_API_KEY
    },
    reducers: {
      updateTranslatorKey: (state, action) => {
        state.translatorKey = action.payload;
        updateTranslatorKeyToLocalStorage(action.payload);
      },
      updateTranscriptGetterEndpoint: (state, action) => {
        state.transcriptGetterEndpoint = action.payload;
        updateTranscriptGetterEndpointToLocalStorage(action.payload);
      },
      updateTranscriptToken: (state, action) => {
        state.transcriptToken = action.payload;
        updateTranscriptTokenToLocalStorage(action.payload);
      },
      updateYoutubeKey: (state, action) => {
        state.youtubeKey = action.payload;
        updateYoutubeKeyToLocalStorage(action.payload);
      }
    }
});

export default configData;
