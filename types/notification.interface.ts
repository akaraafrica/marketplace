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
  itemType?: string;
  read: boolean;
  item?: IItem;
  receiver: IUser;
  sender?: IUser;
  createdAt: Date;
}
