import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import NextImage from "../Image";
import Link from "../Link";
import styles from "./index.module.scss";
import { maskWallet } from "../../../utils/helpers/maskWallet";
import DefaultAvatar from "../DefaultAvatar";
import { getUserName } from "../../../utils/helpers/getUserName";

interface properties {
  balance: string;
}
const Index = ({ balance }: properties) => {
  const { user, signOut } = useContext(AuthContext);

  return (
    <div className={styles.root}>
      <span className={styles.name}> {user && getUserName(user)}</span>
      <div className={styles.wallet}>
        <span>{maskWallet(user?.walletAddress || "")}</span>
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
          <span className={styles.amt}>{balance} ETH</span>
        </div>
      </div>
      <div className={styles.list}>
        {user && (
          <DefaultAvatar
            username={user.username}
            url={user?.profile?.avatar}
            width="40px"
            height="40px"
            walletAddress={user?.walletAddress || ""}
            fontSize="0.7em"
            length={2}
          />
        )}

        <Link href={`/profile/${user?.id}`}>
          <span>Profile</span>
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
        <Link href={`/dashboard/${user?.id}`}>
          <span>Dashboard</span>
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
        <Link href={`/profile/${user?.id}?open=1`}>
          <span>Collections</span>
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
