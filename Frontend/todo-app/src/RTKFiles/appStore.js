import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import ModalReducer from "./ModalSlice";
import todo_api from "./TODOQuery";

const appStore = configureStore({
  reducer: {
    [todo_api.reducerPath]: todo_api.reducer,
    user: userReducer,
    Modal: ModalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todo_api.middleware),
});

export default appStore;
