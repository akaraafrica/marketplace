import { IUser } from "./user.interface";
import { IItem } from "./item.interface";

export interface ICollectionType {
  id: number | string;
  name: string;
  minOwners: number;
  maxOwners: number;
  minItems: number;
  maxItems: number;
  typeId: string;
}
export interface ICollection {
  id: number;
  title: string;
  tokenId: string;
  collectionTypeId: number;
  items: IItem[];
  description: string;
  createdAt: string;
  updatedAt: string;
  author: IUser;
  images: string[];
  videos: string[];
  ratings: any[];
  type: ICollectionType;
  owners: IUser[];
  status: ContributorStatus;
}
enum ContributorStatus {
  PENDING,
  ACCEPTED,
  REJECTED,
}
