import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
// import disciplineReducer from "./slice/disciplineVisibilitySlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    // disciplineVisibility: disciplineReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
