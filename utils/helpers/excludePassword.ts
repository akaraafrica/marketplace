import { User } from "@prisma/client";
import { IUser } from "../../types/user.interface";

export default function excludePassword(
  users: IUser | IUser[] | User | User[] | null
) {
  function exclude<User, Key extends keyof User>(
    user: User,
    ...keys: Key[]
  ): Omit<User, Key> {
    for (let key of keys) {
      delete user[key];
    }
    return user;
  }

  if (Array.isArray(users)) {
    // @ts-ignore: Unreachable code error
    const newUsers = users.map((user) => exclude(user, "password"));
    return newUsers;
  }
  // @ts-ignore: Unreachable code error
  return exclude(users, "password");
}
