import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { UserDs } from "../ds";

type props = {
  children: ReactNode;
};
export type AuthUser = {
  email: string;
  id: number;
  walletAddress: string;
  collections: any[];
  items: any[];
  userFollowers: any[];
  userFollowering: any[];
  bids: any[];
  verified: boolean;
};

type userContext = {
  user: AuthUser | null;
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
};

const UserContext = createContext<userContext | null>(null);

function UserProvider({ children }: props) {
  const [user, setUser] = useState<AuthUser | null>(null);
  useEffect(() => {
    const address = localStorage.getItem("address");
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
