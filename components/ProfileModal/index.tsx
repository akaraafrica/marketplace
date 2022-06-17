/* eslint-disable @next/next/no-img-element */
// TODO: convert this to NextImage when given the chance
import React from "react";
import styles from "./index.module.scss";

function ProfileModal() {
  return (
    <div className={styles.profilemodalcon}>
      <div className={styles.tooltipiconcon}>
        <img
          alt="tool tip icon"
          className={styles.tooltipicon}
          src={`/assets/toolTipIcon.svg`}
        />
      </div>
      <div className={styles.profilemodal}>
        <div className={styles.profilemodalhead}>
          <h1>Sarah Shaibu</h1>
          <div className={styles.profilemodalheadsec2}>
            <p>0xc4c16ab5ac7d...b21a</p>
            <img alt="copy icon" src={`/assets/copyicon.svg`} />
          </div>
        </div>
        <div className={styles.balancecard}>
          <div className={styles.balancecardsec1}>
            <img alt="balance card image" src={`/assets/balancecardimg.svg`} />
          </div>
          <div className={styles.balancecardsec2}>
            <p>Balance</p>
            <h1>4.689 ETH</h1>
          </div>
        </div>
        <div className={styles.profilemodallistcon}>
          <div className={styles.profilemodallist}>
            <img alt="user icon" src={`/assets/usericon.svg`} />
            <p>My Profile</p>
          </div>
          <div className={styles.line}></div>
          <div className={styles.profilemodallist}>
            <img alt="collection icon" src={`/assets/collectionicon.svg`} />
            <p>My Collections</p>
          </div>
          <div className={styles.line}></div>
          <div className={styles.profilemodallist}>
            <img alt="settings icon" src={`/assets/settingsicon.svg`} />
            <p>Settings</p>
          </div>
          <div className={styles.line}></div>
          <div className={styles.profilemodallist}>
            <img alt="logout" src={`/assets/logout.svg`} />
            <p>Log Out</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProfileModal;
