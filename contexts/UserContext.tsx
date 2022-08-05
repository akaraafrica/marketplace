import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { UserDs } from "../ds";
import { IUser } from "../types/user.interface";

type props = {
  children: ReactNode;
};

type userContext = {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
};

const UserContext = createContext<userContext | null>(null);

function UserProvider({ children }: props) {
  const [user, setUser] = useState<IUser | null>(null);
  useEffect(() => {
    const address = localStorage.getItem("address");
    console.log("address item is ", address);
    if (address) {
      UserDs.fetch(address).then((user) => setUser(user));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);

export default UserProvider;
