import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: [],
    createdGroup: null,
    createdChat: null,
  },
  reducers: {
    createChat: (state, action) => {},
    createGroupChat: (state, action) => {},
    getUserChat: (state, action) => {},
  },
});
export const { createChat, createGroupChat, getUserChat } = chatSlice.actions;
export default chatSlice.reducer;
