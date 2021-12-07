import { createSlice } from "@reduxjs/toolkit";

const modeSlice = createSlice({
  name: "mode",
  initialState: {
    colorMode: false,
    langMode: "jpn",
  },
  reducers: {
    setColorMode: (state) => {
      state.colorMode = !state.colorMode;
    },
    setLangMode: (state, action) => {
      state.langMode = action.payload;
    },
  },
});

export const { setColorMode, setLangMode } = modeSlice.actions;
export default modeSlice.reducer;
