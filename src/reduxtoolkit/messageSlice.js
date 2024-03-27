import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    messages: [],
    newMessages: null,
  },
  reducers: {
    createNewMessage: (state, action) => {
      state.newMessages = action.payload;
    },
    getMessages: (state, action) => {
      state.messages = action.payload;
    },
    clearMessageStore: (state, action) => {
      state.messages = [];
      state.newMessages = [];
    },
    updateMessages: (state, action) => {
      state.messages.push(action.payload);
    },
  },
});

export const {
  createNewMessage,
  getMessages,
  clearMessageStore,
  updateMessages,
} = messageSlice.actions;
export default messageSlice.reducer;
