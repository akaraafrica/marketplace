import React from "react";
import styles from "./index.module.scss";
import FollowingSec from "../FollowingSec";

function Following() {
  return (
    <div className={styles.Favourites}>
      <FollowingSec
        ProfilePhoto={`/assets/profilephoto.png`}
        Name="Sally Fadel"
        Followers="161 followers"
        FollowerImage={`/assets/notificationImg.png`}
      />
      <FollowingSec
        ProfilePhoto={`/assets/profilephoto.png`}
        Name="Sally Fadel"
        Followers="161 followers"
        FollowerImage={`/assets/notificationImg.png`}
      />
      <FollowingSec
        ProfilePhoto={`/assets/profilephoto.png`}
        Name="Sally Fadel"
        Followers="161 followers"
        FollowerImage={`/assets/notificationImg.png`}
      />
    </div>
  );
}
export default Following;
