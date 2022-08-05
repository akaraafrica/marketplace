import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import NextImage from "../../components/Image";
import { IUser } from "../../types/user.interface";
import Link from "../Link";
import styles from "./index.module.scss";

const Index = () => {
  const { user, isAuthenticated, signOut } = useContext(AuthContext);

  return (
    <div className={styles.root}>
      <span className={styles.name}>Sarah Shaibu</span>
      <div className={styles.wallet}>
        <span>{user?.walletAddress}</span>
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
        <Link href={`/profile/${user?.id}`}>
          <span>My Profile</span>
        </Link>
      </div>
      <div className={styles.line}></div>
      <div className={styles.list}>
        <NextImage
          width="20px"
          height="20px"
          alt="user icon"
          src="/assets/collectionicon.svg"
        />
        <Link href={`/profile`}>
          <span>My Collections</span>
        </Link>
      </div>
      <div className={styles.line}></div>
      <div className={styles.list}>
        <NextImage
          width="20px"
          height="20px"
          alt="user icon"
          src="/assets/settingsicon.svg"
        />
        <Link href={`/settings`}>
          <span>Settings</span>
        </Link>
      </div>
      <div className={styles.line}></div>
      <div className={styles.list}>
        <NextImage
          width="20px"
          height="20px"
          alt="user icon"
          src="/assets/logout.svg"
        />
        <span onClick={() => signOut()}>Logout</span>
      </div>
    </div>
  );
};

export default Index;
