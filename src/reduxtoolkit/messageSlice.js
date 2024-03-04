import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    messages: [],
    newMessages: null,
  },
  reducers: {
    createMessage: (state, action) => {},
    getAllMessages: (state, action) => {},
  },
});

export const { createMessage, getAllMessages } = messageSlice.actions;
export default messageSlice.reducer;
