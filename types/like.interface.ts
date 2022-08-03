import { IUser } from "./user.interface";
import { IItem } from "./item.interface";
import { ICollection } from "./collection.interface";

export interface ILike {
  id?: number;
  itemId?: number | null;
  collectionId?: number | null;
  userId: number;
  Collection?: ICollection;
  user?: IUser;
  item?: IItem;
}
