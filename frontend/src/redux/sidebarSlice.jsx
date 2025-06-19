import { createSlice } from "@reduxjs/toolkit";

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    width: "280px",
    toggle: false,
    isShowSidebar: false,
  },
  reducers: {
    sidebarWidth: (state, action) => {
      state.width = action.payload;
    },
    sidebarToggle: (state, action) => {
      state.toggle = action.payload;
    },
    showSidebar: (state, action) => {
      state.isShowSidebar = action.payload;
    },
  },
});

export const { sidebarWidth, sidebarToggle, showSidebar } =
  sidebarSlice.actions;

export default sidebarSlice.reducer;
