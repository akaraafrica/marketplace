import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import styles from "./ContributorsGrid.module.scss";
import DefaultAvatar from "../../global/DefaultAvatar";
import { ContributorDs } from "../../../ds";
import { RiCloseCircleLine } from "react-icons/ri";
import { toast } from "react-toastify";

const UserCard = ({ contributor, isAuthor, handleDelete }: any) => {
  const user = contributor.user;
  const [edit, setEdit] = useState(false);
  const [percentage, setPecentage] = useState(contributor?.percentage || 0);

  const handleSubmit = async () => {
    setEdit(false);
    await ContributorDs.updatePercentage({ id: contributor.id, percentage });
    toast.success("contributor percentage updated");
  };

  const handleChange = (e: any) => {
    const number = Number(e.target.value);
    if (number >= 0 && number <= 100) {
      setPecentage(number);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.sellerCardMain}>
        <span className={styles.close}>
          <RiCloseCircleLine
            size={20}
            onClick={() => handleDelete(contributor.id)}
          />
        </span>
        {user?.profile && user.profile.avatar ? (
          <Avatar
            src={user.profile.avatar}
            alt="seller-photo"
            className={styles.selercardavatar}
          />
        ) : (
          <div className={styles.defaultAvatar}>
            {user?.walletAddress && (
              <DefaultAvatar
                username={user.username}
                url={user?.profile?.avatar}
                width="80px"
                height="80px"
                fontSize="8px"
                walletAddress={user.walletAddress}
              />
            )}
          </div>
        )}
        <div className={styles.sellerName}>
          {user?.profile && user.profile.name && user.profile.name}
        </div>
        <div className={styles.status}>
          status : <span>{contributor.confirmation}</span>
        </div>
        {isAuthor && (
          <div className={styles.percentage}>
            percentage :
            {edit ? (
              <input value={percentage} onChange={handleChange} />
            ) : (
              <span>{percentage}%</span>
            )}
            {edit ? (
              <button onClick={handleSubmit}>submit</button>
            ) : (
              <button onClick={() => setEdit(true)}>edit</button>
            )}
          </div>
        )}
        {!isAuthor && (
          <div className={styles.percentage}>
            percentage : <span>{percentage}%</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
