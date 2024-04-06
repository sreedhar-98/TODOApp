import { createSlice } from "@reduxjs/toolkit";

const tabSlice = createSlice({
  name: "tab",
  initialState: { isTodo: true, isCompleted: false },
  reducers: {
    setTODO: (state, action) => {
      return {
        isTodo: true,
        isCompleted: false,
      };
    },
    setCompleted: (state, action) => {
      return {
        isTodo: false,
        isCompleted: true,
      };
    },
    resetTabSlice: (state, action) => {
      return { isTodo: true, isCompleted: false };
    },
  },
});

export const { setTODO, setCompleted, resetTabSlice } =
  tabSlice.actions;

export default tabSlice.reducer;
