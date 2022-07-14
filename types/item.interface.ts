import { IBid } from "./bid.interface";
import { IUser } from "./user.interface";

export interface IItem {
  id: number | string;
  ownerId: number;
  tokenId: string;
  title: string;
  description: string;
  images: [string];
  video: string;
  acceptedBid: number;
  createdAt: string;
  openForBid: boolean;
  price: number;
  published: boolean;
  publishedAt: string;
  updatedAt: string;
  rating: number;
  owner: IUser;
  bids: IBid[];
}
