import { configureStore } from "@reduxjs/toolkit";
import userSlicer from "../features/userSlicer";
export const store = configureStore({
  reducer: {
    users: userSlicer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
