import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { IUser } from '../../models';
import type { RootState } from "./store";

const today = new Date();
const date =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

// Define the initial state using that type
const initialState: any = {
  id: 0,
  name: "",
  address: "",
  cover: "",
  avatar: "",
  joined: date,
  portfolio: [],
  isVerified: false,
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    set: (state, action: PayloadAction<any>) => {
      return action.payload;
    },
  },
});

export const { set } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
