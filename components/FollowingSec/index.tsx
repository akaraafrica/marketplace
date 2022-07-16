/* eslint-disable @next/next/no-img-element */
// TODO: convert this to NextImage when given the chance
import React from "react";
import styles from "./index.module.scss";

function FollowingSec(props: any) {
  return (
    <div className={styles.followingseccon}>
      <div className={styles.followingsec}>
        <div className={styles.followingsec1con}>
          <img alt="profile photo" src={props.ProfilePhoto} />
          <div className={styles.followingsec1content}>
            <h4>{props.Name}</h4>
            <p>{props.Followers}</p>
            <button>Unfollow</button>
          </div>
        </div>
        <div className={styles.followingsec2con}>
          {props.followerItems.slice(0, 3).map((item: any, index: number) => (
            <img key={index} alt="follower image " src={props.FollowerImage} />
          ))}
        </div>
      </div>
    </div>
  );
}
export default FollowingSec;
