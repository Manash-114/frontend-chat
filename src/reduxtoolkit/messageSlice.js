import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    messages: [],
    newMessages: [],
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
  },
});

export const { createNewMessage, getMessages, clearMessageStore } =
  messageSlice.actions;
export default messageSlice.reducer;
