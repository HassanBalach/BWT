import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentNaats: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeNaat: {},
  genreListId: "",
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setActiveNaat: (state, action) => {
      // console.log(action.payload?.data?.albumOfTrack);
      // console.log(action.payload?.data?.artists);
      // console.log(state.currentNaats);
      // const Naat = naat?.data?.albumOfTrack;

      state.activeNaat = action.payload.naat;

      if (action.payload?.data?.albumOfTrack) {
        state.currentNaats = action.payload.data.albumOfTrack;
      } else if (action.payload?.data?.artists) {
        state.currentNaats = action.payload?.data?.artists?.items;
      } else {
        state.currentNaats = action.payload.data;
      }

      state.currentIndex = action.payload.i;
      state.isActive = true;
    },

    nextSong: (state, action) => {
      if (state.currentNaats[action.payload]?.track) {
        state.activeNaat = state.currentNaats[action.payload]?.track;
      } else {
        state.activeNaat = state.currentNaats[action.payload];
      }

      state.currentIndex = action.payload;
      state.isActive = true;
    },

    prevSong: (state, action) => {
      if (state.currentNaats[action.payload]?.track) {
        state.activeNaat = state.currentNaats[action.payload]?.track;
      } else {
        state.activeNaat = state.currentNaats[action.payload];
      }

      state.currentIndex = action.payload;
      state.isActive = true;
    },

    playPause: (state, action) => {
      state.isPlaying = action.payload;
    },

    selectGenreListId: (state, action) => {
      state.genreListId = action.payload;
    },
  },
});

export const {
  setActiveNaat,
  nextSong,
  prevSong,
  playPause,
  selectGenreListId,
} = playerSlice.actions;

export default playerSlice.reducer;
