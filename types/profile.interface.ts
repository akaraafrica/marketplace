import { ICollection } from "./collection.interface";
import { IItem } from "./item.interface";
import { ILike } from "./like.interface";
import { IUser } from "./user.interface";

export interface UProfile {
  name: string;
  username: string;
  avatar: string;
  website: string;
  twitter: string;
  facebook: string;
  instagram: string;
  dob: string;
  bio: string;
  gender: string;
  rating: string;
  phoneNumber: string;
}
export interface IProfile {
  username: string;
  profile?: UProfile;
  id: number;
  avatar?: string;
  bio?: string;
  name?: string;
  walletAddress?: string;
  createdAt?: string;
  items?: IItem[];
  likes?: ILike[];
  verified?: boolean;
  collections?: ICollection[];
  following?: {
    followerId: number;
    followingId: number;
  }[];
  followers?: {
    followerId: number;
    followingId: number;
  }[];
}

export const profileInitialState: IProfile = {
  id: 0,
  name: "John Snow",
  avatar: "",
  username: "",
};
