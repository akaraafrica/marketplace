import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { UserDs } from "../../ds";
import { IUser } from "../../types/user.interface";
import styles from "./AddContributors.module.scss";
import Image from "../Image";
import DefaultAvatar from "../DefaultAvatar";
export default function AddContributor() {
  const [resultDisplay, setResultDisplay] = useState(false);
  const [searchUser, setSearchUser] = useState("");
  const [users, setUsers] = useState<null | IUser[]>(null);
  const [selectedUser, setSelectedUser] = useState<IUser[]>([]);

  useEffect(() => {
    UserDs.fetchAll().then((users) => {
      setUsers(users);
    });
  }, []);
  return (
    <div className={styles.itemdetailsforminputSearch}>
      <div className={styles.inputSection}>
        <input
          type="text"
          name="Search"
          placeholder="Add Contributors"
          value={searchUser}
          onChange={(e) => {
            setResultDisplay(true);
            setSearchUser(e.target.value);
          }}
        />
        {selectedUser.length >= 1 && <button>add</button>}
      </div>

      <div
        style={{ display: `${resultDisplay ? "flex" : "none"}` }}
        className={styles.searchResults}
      >
        {searchUser &&
          users &&
          users
            .filter((user) => user.walletAddress.includes(searchUser))
            .map((user, index) => (
              <span
                key={index}
                onClick={() => {
                  for (let i = 0; i < selectedUser.length; i++) {
                    if (selectedUser[i].walletAddress === user.walletAddress) {
                      toast.warning("User already selected");
                      return;
                    }
                  }
                  setSelectedUser([...selectedUser, user]);
                  setSearchUser("");
                  setResultDisplay(false);
                }}
              >
                {user.walletAddress && user.walletAddress}
              </span>
            ))}
      </div>
      <div className={styles.itemImagesDiv}>
        {selectedUser.map((user, index) => (
          <div key={index} className={styles.userImage}>
            <div
              className={styles.closeIcon}
              onClick={() =>
                setSelectedUser([
                  ...selectedUser.slice(0, index),
                  ...selectedUser.slice(index + 1, selectedUser.length),
                ])
              }
            >
              <Image
                width="30px"
                height="30px"
                alt="close icon"
                src={`/assets/closeicon.svg`}
              />
            </div>
            <DefaultAvatar
              fontSize=".6rem"
              url={user?.profile?.avatar}
              walletAddress={user.walletAddress}
              width="56px"
              height="56px"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
