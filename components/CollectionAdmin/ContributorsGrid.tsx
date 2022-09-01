import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ICollection } from "../../types/collection.interface";
import styles from "./ContributorsGrid.module.scss";
import UserCard from "./UserCard";

const ContributorsGrid = ({ collection }: any) => {
  const { user } = useContext(AuthContext);
  const isAuthor = true;

  // const isAuthor = user?.walletAddress === collection.author?.walletAddress;
  return (
    <div className={styles.main}>
      {collection?.contributors?.map((user: any) => (
        <div key={user.id}>
          <UserCard contributor={user} isAuthor={isAuthor} />
        </div>
      ))}
    </div>
  );
};

export default ContributorsGrid;
