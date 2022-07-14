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
  id: number | string;
  title: string;
  typeId: string;
  collectionTypeId: number;
  items: IItem[];
  description: string;
  createdAt: string;
  updatedAt: string;
  author: IUser;
  images: string[];
  videos: string[];
  rating: number;
  type: ICollectionType;
  owners: IUser[];
}
