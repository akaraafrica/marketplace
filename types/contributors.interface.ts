import { IUser } from "./user.interface";

export interface IContributor {
  id: number;
  updatedAt: string;
  collectionId: number;
  confirmation: ContributorStatus;
  percentage: number;
  userId: number;
  user: IUser;
}

enum ContributorStatus {
  PENDING,
  ACCEPTED,
  REJECTED,
}
