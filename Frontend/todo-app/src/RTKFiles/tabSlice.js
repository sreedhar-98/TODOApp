import { createSlice } from "@reduxjs/toolkit";

const tabSlice = createSlice({
  name: "tab",
  initialState: { isTodo: true, isCompleted: false, disableCompleted: false },
  reducers: {
    setTODO: (state, action) => {
      return { isTodo: true, isCompleted: false, disableCompleted: false };
    },
    setCompleted: (state, action) => {
      return { isTodo: false, isCompleted: true, disableCompleted: false };
    },
    disableCompleted: (state, action) => {
      return {
        isTodo: true,
        isCompleted: false,
        disableCompleted: action.payload.status,
      };
    },
    resetTabSlice: (state, action) => {
      return { isTodo: true, isCompleted: false, disableCompleted: false };
    },
  },
});

export const { setTODO, setCompleted, disableCompleted, resetTabSlice } =
  tabSlice.actions;

export default tabSlice.reducer;
