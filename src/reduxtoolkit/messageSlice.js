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
  },
});

export const { createNewMessage, getMessages } = messageSlice.actions;
export default messageSlice.reducer;
