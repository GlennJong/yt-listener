import { createSlice } from "@reduxjs/toolkit";

// timestamp for current
const currentDateTime = new Date();

// methods
function saveToLibrary(state, data) {
  const currentLibrary = [...state.libraryData];
  const timestampIndex = currentLibrary.findIndex(data => data.timestamp === currentDateTime);
  
  const item = {timestamp: currentDateTime, words: data};

  if (timestampIndex !== -1) {
    data.forEach(child => currentLibrary[timestampIndex].words.push(child));
  }
  else {
    currentLibrary.push(item);
  }

  state.libraryData = currentLibrary;
  updateLocalStorage(currentLibrary);
}

function updateLocalStorage(data) {
  localStorage.setItem('wordLibrary', JSON.stringify(data));
}

// localStorage data
let storeData = window.localStorage.getItem('wordLibrary') || null;
storeData = storeData ? JSON.parse(storeData) : [];
storeData.forEach(item => item.timestamp = new Date(item.timestamp));


// word Library
const wordLibrary = createSlice({
    name: 'wordLibrary',
    initialState: {
      'libraryData': storeData,
      'currentData': [],
    },
    reducers: {
      updateItemToCurrentData: (state, action) => {
        const item = action.payload;
        const data = [...state.currentData];
        const index = data.findIndex(data => data.content === item.content && data.origin === item.origin);
        data.splice(index, 1, item);
        state.currentData = data;
      },
      addItemToCurrentData: (state, action) => {
        const item = action.payload;
        const data = [...state.currentData];
        data.push(item);
        state.currentData = data;
      },
      removeItemFromCurrentData: (state, action) => {
        const item = action.payload;
        const data = [...state.currentData];
        const index = data.findIndex(data => (data.content === item.content && data.origin === item.origin));
        data.splice(index, 1);
        state.currentData = data;
      },
      archiveCurrentDataToLibrary: (state) => {
        const data = [...state.currentData];
        saveToLibrary(state, data);
      },
      clearCurrentData: (state) => {
        state.currentData = [];
      },
      updateLibraryData: (state, action) => {
        state.libraryData = action.payload;
        updateLocalStorage(action.payload)
      }
    }
});

export default wordLibrary;
