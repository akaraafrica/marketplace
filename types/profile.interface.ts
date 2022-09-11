import { ICollection } from "./collection.interface";
import { IItem } from "./item.interface";
import { ILike } from "./like.interface";

export interface IProfile {
  id?: number;
  avatar?: string;
  bio?: string;
  name?: string;
  walletAddress?: string;
  createdAt?: string;
  items?: IItem[];
  likes?: ILike[];
  collections?: ICollection;
  following?: {
    id: number;
  }[];
  followedBy?: {
    id: number;
  }[];
}

export const profileInitialState: IProfile = {
  id: 0,
  name: "John Snow",
  avatar: "",
};
