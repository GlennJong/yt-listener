import { createSlice } from "@reduxjs/toolkit";

function updateLocalStorage(data) {
  localStorage.setItem('guideStatus', JSON.stringify(data));
}

// localStorage data
let storeData = window.localStorage.getItem('guideStatus') || null;
storeData = storeData ? JSON.parse(storeData) : 'show';

const guideStatus = createSlice({
    name: 'guideStatus',
    initialState: {
      'show': storeData === 'show' ? true : false
    },
    reducers: {
      hideGuide: (state) => {
        state.show = false;
        updateLocalStorage('hide');
      },
      showGuide: (state) => {
        state.show = true;
        updateLocalStorage('show');
      }
    }
});

export default guideStatus;
