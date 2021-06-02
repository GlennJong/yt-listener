import { createSlice } from "@reduxjs/toolkit";

const videoId = createSlice({
    name: 'videoId',
    initialState: {
      'id': null,
    },
    reducers: {
      clearVideoId: (state) => {
        state.id = null;
      },
      updateVideoId: (state, action) => {
        state.id = action.payload;
      }
    }
});

export default videoId;
