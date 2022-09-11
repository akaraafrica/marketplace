/* eslint-disable @next/next/no-img-element */
// TODO: convert this to NextImage when given the chance
import React from "react";
import styles from "./index.module.scss";

function FollowingSec({ person }: any) {
  return (
    <div className={styles.followingsec}>
      <div className={styles.followingsec1con}>
        <img
          alt="profile photo"
          src={person?.profile?.image || `/assets/profilephoto.png`}
        />
        <div className={styles.followingsec1content}>
          <h4>{person?.profile?.name || person.walletAddress?.slice(0, 6)}</h4>
          <p>
            {person?.followedBy?.length} <span> followers</span>
          </p>
        </div>
      </div>
      <div className={styles.followingsec2con}>
        {person.items.slice(0, 4).map((item: any) => (
          <img key={item.id} alt="follower image" src={item.images[0]} />
        ))}
      </div>
    </div>
  );
}
export default FollowingSec;
