/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import web3 from "web3";
import styles from "./index.module.scss";
// import NotificationModal from "../NotificationModal/index";
// import ProfileModal from "../ProfileModal/index";
// import MobileHeader from "../MobileHeader/index";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../../contexts/AuthContext";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../../connectors";
import { useContract } from "../../hooks/web3";
import { CHAIN_TO_WETH_ADDRESS, SupportedChainId } from "../../constants";
import WETH_ABI from "../../artifacts/weth.json";
import NewNotificationModal from "../NewNotificationModal";
import NewProfileModal from "../NewProfileModal";
import { IoMenuSharp, IoClose } from "react-icons/io5";
import { MdNotificationsNone } from "react-icons/md";
import NextImage from "../../components/Image";
import CustomSelect from "../CustomSelect";
import Link from "../Link";

function Header() {
  const [notificationOpen, setNotificationOpen] = React.useState(false);
  const [profileOpen, setProfileOpen] = React.useState(false);
  const [mobile, setMobile] = React.useState(false);
  const router = useRouter();
  const { user, isAuthenticated } = useContext(AuthContext);
  const [balance, setBalance] = useState("0");
  const { account, active, activate, chainId } = useWeb3React();
  const wethContract = useContract(
    CHAIN_TO_WETH_ADDRESS[chainId as SupportedChainId],
    WETH_ABI
  );
  async function getBalance() {
    const balance = await wethContract?.balanceOf(account);
    const formattedBalance = web3.utils.fromWei(balance?.toString() || "0");
    console.log("balance here is ", balance);
    console.log("formatted balance is ", formattedBalance);
    setBalance(Number(formattedBalance).toFixed());
  }

  useEffect(() => {
    if (account) getBalance();
    if (
      (isAuthenticated && !active) ||
      (isAuthenticated && user?.walletAddress != account)
    )
      activate(injected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, active]);

  useEffect(() => {
    (async () => {
      if (user?.id) {
        // const { data } = await NotificationDs.fetch(user?.id);
      }
    })();
  });

  function handleUpload() {
    user
      ? router.push("/item/create")
      : toast.info("You must be logged in to create an item.");
  }
  return (
    <div className={styles.headerCon}>
      <div className={styles.mobile}>
        <div className={styles.mobileTop}>
          <Link href={`/`}>
            <NextImage
              alt="logo"
              src="/assets/Logo.png"
              width="70px"
              height="30px"
            />
          </Link>
          {mobile ? (
            <IoClose onClick={() => setMobile(false)} size={40} />
          ) : (
            <IoMenuSharp onClick={() => setMobile(true)} size={40} />
          )}
        </div>
        <div>
          <CustomSelect placeholder="Search" />
        </div>
        <div className={mobile ? styles.mobileContent : styles.contentNone}>
          <Link href={`/marketplace`}>
            <span>Marketplace</span>
          </Link>
          <span>How it works</span>
          <Link href={`/notifications`}>
            <span>Notifications</span>
          </Link>
          {user?.id && (
            <Link href={`/profile/${user?.id}`}>
              <span>Profile</span>
            </Link>
          )}
          <Link href="/settings">
            <span>Settings</span>
          </Link>
          <button onClick={() => handleUpload()}>Upload</button>
          <span>Logout</span>
        </div>
      </div>
      <div className={styles.header}>
        <div className={styles.left}>
          <Link href={`/`}>
            <img alt="logo" src={`/assets/Logo.png`} />
          </Link>
          <hr />
          <ul>
            <li>
              <Link href={`/marketplace`}>
                <span>Marketplace</span>
              </Link>
            </li>
            <li>How it works</li>
          </ul>
        </div>
        <div className={styles.right}>
          <div className={styles.search}>
            <input type="text" placeholder="Search" />
            <img alt="search icon" src={`/assets/searchIcon.svg`} />
          </div>
          <div
            className={styles.notification}
            onClick={() => {
              // user
              // ? router.push("/login")
              setNotificationOpen(!notificationOpen);
              setProfileOpen(false);
            }}
          >
            <div className={styles.active}></div>
            <MdNotificationsNone size={40} />
            {notificationOpen && (
              <div className={styles.dialog}>
                <NewNotificationModal />
              </div>
            )}
          </div>
          <button
            type="button"
            className={user ? styles.btnLight : styles.btn}
            onClick={() => handleUpload()}
          >
            Upload
          </button>
          {user ? (
            <div
              className={styles.balanceSec}
              onClick={() => {
                setProfileOpen(!profileOpen);
                setNotificationOpen(false);
              }}
            >
              <img alt="avatar" src={`/assets/Avator.svg`} />
              <div className={styles.amt}>
                {balance} <span>ETH</span>
              </div>
              {profileOpen && (
                <div className={styles.profile}>
                  <NewProfileModal balance={balance} />
                </div>
              )}
            </div>
          ) : (
            <div className={styles.auth}>
              <Link href={"/login"}>
                <span>Login </span>
              </Link>
              |
              <Link href={`/signup`}>
                <span> Signup</span>
              </Link>
            </div>
          )}
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}
export default Header;
