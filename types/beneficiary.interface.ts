import { ICollection } from "./collection.interface";
import { IUser } from "./user.interface";

export interface IBeneficiary {
  id: number;
  name: string;
  walletAddress: string;
  description: string;
  percentage: number;
  userId: number;
  user: IUser;
  collectionId: number;
  collection: ICollection;
}
