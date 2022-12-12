import { IBid } from "./bid.interface";
import { IItem } from "./item.interface";
import { ILike } from "./like.interface";
import { IProfile, profileInitialState } from "./profile.interface";

const today = new Date();
const date =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

export interface IUser {
  id: number;
  username: string;
  walletAddress: string;
  email: string;
  accessToken?: string;
  joined?: string;
  verified?: boolean;
  profile: IProfile | null;
  bids?: IBid[];
  likes?: ILike[];
  items?: IItem[];
}

export const initialState: IUser = {
  id: 0,
  username: "",
  email: "",
  accessToken: "",
  walletAddress: "",
  joined: date,
  verified: false,
  profile: profileInitialState,
  bids: [],
  likes: [],
  items: [],
};
