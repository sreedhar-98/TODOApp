import { createSlice } from "@reduxjs/toolkit";

const ModalSlice = createSlice({
  name: "MODAL",
  initialState: null,
  reducers: {
    setModal: (state, action) => {
      const todo = action.payload.todo;
      const isNew = action.payload.isNew;
      const pageId = action.payload.pageId;
      return { isNew: isNew, todo: todo, pageId: pageId };
    },
    resetModal: (state, action) => {
      return null;
    },
  },
});

export const { setModal, resetModal } = ModalSlice.actions;

export default ModalSlice.reducer;
