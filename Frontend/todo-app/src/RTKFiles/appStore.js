import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import tabReducer from "./tabSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    tab:tabReducer
  },
});
export default appStore;
