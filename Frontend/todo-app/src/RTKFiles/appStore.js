import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import tabReducer from "./tabSlice";
import ModalReducer from "./ModalSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    tab:tabReducer,
    Modal:ModalReducer
  },
});
export default appStore;
