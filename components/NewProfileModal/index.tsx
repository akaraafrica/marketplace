import React, { useContext, useEffect, useState } from "react";
import web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import { AuthContext } from "../../contexts/AuthContext";
import NextImage from "../../components/Image";
import Link from "../Link";
import styles from "./index.module.scss";
import { useContract } from "../../hooks/web3";
import { CHAIN_TO_WETH_ADDRESS, SupportedChainId } from "../../constants";
import WETH_ABI from "../../artifacts/weth.json";
import { formControlClasses } from "@mui/material";

const Index = () => {
  const { user, isAuthenticated, signOut } = useContext(AuthContext);
  const { account, chainId } = useWeb3React();
  const wethContract = useContract(
    CHAIN_TO_WETH_ADDRESS[chainId as SupportedChainId],
    WETH_ABI
  );
  const [balance, setBalance] = useState("0");

  async function getBalance() {
    console.log("we have user here ", user);

    console.log("weth contract is ", wethContract);
    console.log("wallet address is ", user?.walletAddress);
    const balance = await wethContract?.balanceOf(account);
    console.log("balance here is ", balance);
    const formattedBalance = web3.utils.fromWei(balance?.toString());
    console.log("formatted balance is ", formattedBalance);
    setBalance(formattedBalance);
  }
  useEffect(() => {
    getBalance();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  return (
    <div className={styles.root}>
      <span className={styles.name}>
        {" "}
        {user?.profile?.name || user?.walletAddress}
      </span>
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
          <span className={styles.amt}>{balance} ETH</span>
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
