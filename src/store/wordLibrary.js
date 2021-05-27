import { createSlice } from "@reduxjs/toolkit";

const wordLibrary = createSlice({
    name: 'wordLibrary',
    initialState: {
      'data': [],
    },
    reducers: {
      updateItemToLibrary: (state, action) => {
        const item = action.payload;
        const currentData = [...state.data];
        const index = currentData.findIndex(data => data.timestamp === item.timestamp);
        currentData.splice(index, 1, item);
        state.data = currentData;
      },
      addItemToLibrary: (state, action) => {
        const item = action.payload;
        const currentData = [...state.data];
        currentData.push(item);
        state.data = currentData;
      },
      removeItemFromLibrary: (state, action) => {
        const item = action.payload;
        const currentData = [...state.data];
        const index = currentData.findIndex(data => (data.content === item.content && data.origin === item.origin));
        currentData.splice(index, 1);
        state.data = currentData;
      }
    }
});

export default wordLibrary;
