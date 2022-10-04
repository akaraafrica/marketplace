import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../../contexts/AuthContext";
import { ContributorDs } from "../../../ds";
import { ICollection } from "../../../types/collection.interface";
import styles from "./index.module.scss";
import UserCard from "../UserCard";

const ContributorsGrid = ({ collection }: { collection: ICollection }) => {
  const { user } = useContext(AuthContext);
  const [contributors, setContributions] = useState(collection?.contributors);

  const isAuthor = user?.walletAddress === collection?.author?.walletAddress;
  const handleDelete = async (id: number) => {
    await ContributorDs.deleteContributor({ id });
    const newContributors = contributors.filter(
      (contributor) => contributor.id != id
    );
    setContributions(newContributors);
    toast.success("contributor deleted");
  };
  return (
    <div className={styles.main}>
      {contributors?.map((user) => (
        <div key={user.id}>
          <UserCard
            contributor={user}
            isAuthor={isAuthor}
            handleDelete={handleDelete}
          />
        </div>
      ))}
    </div>
  );
};

export default ContributorsGrid;
