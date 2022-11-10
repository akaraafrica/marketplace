import { IUser } from "../../types/user.interface";

export function getUserName(user: IUser) {
  return user?.profile?.name || user?.email?.split("@")[0];
}
