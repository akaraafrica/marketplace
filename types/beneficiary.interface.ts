import { ICollection } from "./collection.interface";
import { IUser } from "./user.interface";

export interface IBeneficiary {
  id?: number | string;
  name: string;
  walletAddress: string;
  description: string;
  percentage: number;
  collection: ICollection;
  user: IUser;
}
