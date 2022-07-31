/* eslint-disable @next/next/no-img-element */
// TODO: convert this to NextImage when given the chance
import React from "react";
import { useWeb3React } from "@web3-react/core";
import { useRouter } from "next/router";
import styles from "./index.module.scss";
// import NotificationModal from "../NotificationModal/index";
// import ProfileModal from "../ProfileModal/index";
// import MobileHeader from "../MobileHeader/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NewNotificationModal from "../NewNotificationModal";
import NewProfileModal from "../NewProfileModal";
import { IoMenuSharp, IoClose } from "react-icons/io5";
import { MdNotificationsNone } from "react-icons/md";
import NextImage from "../../components/Image";
import CustomSelect from "../CustomSelect";
import { useUser } from "../../contexts/UserContext";

function Header() {
  const [notificationOpen, setNotificationOpen] = React.useState(false);
  const [profileOpen, setProfileOpen] = React.useState(false);
  const [mobile, setMobile] = React.useState(false);
  const { account, active, activate } = useWeb3React();
  const router = useRouter();
  const user = useUser()?.user;

  function handleUpload() {
    console.log(`uploading here active is :${active}  account is ${account}`);
    if (account && active) router.push("/single-item");
    else {
      toast.info("You must be logged in to create an item.");
    }
  }

  return (
    <div className={styles.headerCon}>
      <div className={styles.mobile}>
        <div className={styles.mobileTop}>
          <a href={`/`}>
            <NextImage
              alt="logo"
              src="/assets/Logo.png"
              width="70px"
              height="30px"
            />
          </a>
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
          <a href={`/marketplace`}>
            <span>Marketplace</span>
          </a>
          <span>How it works</span>
          <a href={`/notifications`}>
            <span>Notifications</span>
          </a>
          <span>Profile</span>
          <button onClick={() => handleUpload()}>Upload</button>
          <span>Logout</span>
        </div>
      </div>
      <div className={styles.header}>
        <div className={styles.left}>
          <a href={`/`}>
            <img alt="logo" src={`/assets/Logo.png`} />
          </a>
          <hr />
          <ul>
            <li>
              <a href={`/marketplace`}>
                <span>Marketplace</span>
              </a>
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
              active && account
                ? router.push("/login")
                : setNotificationOpen(!notificationOpen);
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
            className={active && account ? styles.btnLight : styles.btn}
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
                7.00698 <span>ETH</span>
              </div>
              {profileOpen && (
                <div className={styles.profile}>
                  <NewProfileModal />
                </div>
              )}
            </div>
          ) : (
            <div className={styles.auth}>
              <a href={"/login"}>
                <span>Login </span>
              </a>
              /
              <a href={`/signup`}>
                <span> Signup</span>
              </a>
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
