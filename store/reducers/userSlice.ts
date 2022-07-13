import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser, initialState } from "../../types/user.interface";
import type { RootState } from "../store";

const today = new Date();
const date =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    set: (state: any, action: PayloadAction<any>) => {
      console.log(state);
      return action.payload;
    },
  },
});

export const { set } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
