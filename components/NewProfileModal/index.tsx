import React from "react";
import NextImage from "../../utils/helpers/NextImage";
import styles from "./index.module.scss";

const Index = () => {
  return (
    <div className={styles.root}>
      <span className={styles.name}>Sarah Shaibu</span>
      <div className={styles.wallet}>
        <span>0xc4c16ab5ac7d...b21a</span>
        <NextImage width="30px" height="30px" src="/assets/copyicon.svg" />
      </div>
      <div className={styles.balCard}>
        <NextImage
          width="50px"
          height="50px"
          src="/assets/balancecardimg.svg"
        />
        <div className={styles.balDiv}>
          <span className={styles.bal}>Balance</span>
          <span className={styles.amt}>4.689 ETH</span>
        </div>
      </div>
      <div className={styles.list}>
        <NextImage
          width="20px"
          height="20px"
          alt="user icon"
          src="/assets/usericon.svg"
        />
        <span>My Profile</span>
      </div>
      <div className={styles.line}></div>
      <div className={styles.list}>
        <NextImage
          width="20px"
          height="20px"
          alt="user icon"
          src="/assets/collectionicon.svg"
        />
        <span>My Collections</span>
      </div>
      <div className={styles.line}></div>
      <div className={styles.list}>
        <NextImage
          width="20px"
          height="20px"
          alt="user icon"
          src="/assets/settingsicon.svg"
        />
        <span>Settings</span>
      </div>
      <div className={styles.line}></div>
      <div className={styles.list}>
        <NextImage
          width="20px"
          height="20px"
          alt="user icon"
          src="/assets/logout.svg"
        />
        <span>Logout</span>
      </div>
    </div>
  );
};

export default Index;
