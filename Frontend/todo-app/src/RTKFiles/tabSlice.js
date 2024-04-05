import { createSlice } from "@reduxjs/toolkit";

const tabSlice = createSlice({
  name: "tab",
  initialState: { isTodo: true, isCompleted: false, disableCompleted: 0 },
  reducers: {
    setTODO: (state, action) => {
      return {
        isTodo: true,
        isCompleted: false,
        disableCompleted: state.disableCompleted,
      };
    },
    setCompleted: (state, action) => {
      return {
        isTodo: false,
        isCompleted: true,
        disableCompleted: state.disableCompleted,
      };
    },
    disableCompleted: (state, action) => {
      if (action.payload.isUpdate) {
        return {
          isTodo: true,
          isCompleted: false,
          disableCompleted: state.disableCompleted + 1,
        };
      } else {
        return {
          isTodo: true,
          isCompleted: false,
          disableCompleted: state.disableCompleted - 1,
        };
      }
    },
    resetTabSlice: (state, action) => {
      return { isTodo: true, isCompleted: false, disableCompleted: false };
    },
  },
});

export const { setTODO, setCompleted, disableCompleted, resetTabSlice } =
  tabSlice.actions;

export default tabSlice.reducer;
