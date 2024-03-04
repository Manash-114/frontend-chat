import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import chatReducer from "./chatSlice";
import messageReducer from "./messageSlice";
const appStore = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    message: messageReducer,
  },
});

export default appStore;
