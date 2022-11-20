import { IItem } from "./item.interface";
import { IUser } from "./user.interface";
export interface IPurchases {
  id: number;
  amount: number;
  createdAt: string;
  transactionId: string;
  isAuction: boolean;
  itemId: number;
  userId: number;
  itemPrevOwnerId: number;
  inCollectionId: number;
  item: IItem;
  user: IUser;
}
