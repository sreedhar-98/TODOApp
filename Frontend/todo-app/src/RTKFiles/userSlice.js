import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {"isLoading":true,"data":null},
  reducers: {
    addUser: (state, action) => {
      return action.payload;
    },
    removeUser: (state, action) => {
      return {"isLoading":false,"data":null};
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;