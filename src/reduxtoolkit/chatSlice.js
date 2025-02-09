import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: [],
    createdGroup: null,
    createdChat: null,
  },
  reducers: {
    createChat: (state, action) => {
      //check whether this chat already exits in the state or not
      //if not exits in the state then add
      const fin = state.chats.find((li) => li.id == action.payload.id);
      if (!fin) state.chats.push(action.payload);
    },
    createGroupChat: (state, action) => {
      state.chats.push(action.payload);
    },
    getUserChat: (state, action) => {
      state.chats = action.payload;
    },
    clearStore: (state, action) => {
      state.chats = [];
    },
  },
});
export const { createChat, createGroupChat, getUserChat, clearStore } =
  chatSlice.actions;
export default chatSlice.reducer;
