import { IUser } from "../../types/user.interface";

export function getUserName(user: IUser) {
  return user?.profile?.name || user?.walletAddress.slice(0, 6);
}
