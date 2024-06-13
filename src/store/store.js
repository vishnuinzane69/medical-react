import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; // Import your authSlice reducer
import { setUserFromLocalStorage } from "./authSlice"; // Import the setUserFromLocalStorage action

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Dispatch setUserFromLocalStorage action during store initialization
store.dispatch(setUserFromLocalStorage());

export default store;