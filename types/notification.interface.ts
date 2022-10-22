import { ICollection } from "./collection.interface";
import { IItem } from "./item.interface";
import { IUser } from "./user.interface";

export interface INotification {
  id?: number;
  senderId: number;
  receiverId: number;
  title: string;
  content?: string;
  action: string;
  itemId?: number;
  collectionId?: number;
  itemType?: string;
  read: boolean;
  item: IItem;
  collection: ICollection;
  receiver: IUser;
  sender?: IUser;
  description: string;
  createdAt: string;
}
