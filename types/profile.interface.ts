import { ICollection } from "./collection.interface";
import { IItem } from "./item.interface";

export interface IProfile {
  id?: number;
  avatar?: string;
  bio?: string;
  name?: string;
  walletAddress?: string;
  createdAt?: string;
  items?: IItem[];
  collections?: ICollection;
  userFollowers?: {
    followerId: number;
    followingId: number;
    id: number;
    updatedAt: string;
  }[];
}

export const profileInitialState: IProfile = {
  id: 0,
  name: "John Snow",
  avatar: "",
};
