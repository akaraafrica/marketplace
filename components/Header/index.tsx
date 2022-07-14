/* eslint-disable @next/next/no-img-element */
// TODO: convert this to NextImage when given the chance
import React from "react";
import Link from "next/link";
import { useWeb3React } from "@web3-react/core";
import { useRouter } from "next/router";
import styles from "./index.module.scss";
import NotificationModal from "../NotificationModal/index";
import ProfileModal from "../ProfileModal/index";
import MobileHeader from "../MobileHeader/index";
import NewNotificationModal from "../NewNotificationModal";
import NewProfileModal from "../NewProfileModal";
import { IoMenuSharp, IoClose } from "react-icons/io5";
import { MdNotificationsNone } from "react-icons/md";
import NextImage from "../../components/Image";
import CustomSelect from "../CustomSelect";

function Header() {
  const [notificationOpen, setNotificationOpen] = React.useState(false);
  const [profileOpen, setProfileOpen] = React.useState(false);
  const [mobile, setMobile] = React.useState(false);
  const { account, active, activate } = useWeb3React();
  const router = useRouter();

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
          <span>Marketplace</span>
          <span>How it works</span>
          <span>Notifications</span>
          <span>Profile</span>
          <button>Upload</button>
          <span>Logout</span>
        </div>
      </div>
      <div className={styles.header}>
        <div className={styles.left}>
          <img alt="logo" src={`/assets/Logo.png`} />
          <hr />
          <ul>
            <li>Marketplace</li>
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
          >
            Upload
          </button>
          {!active && !account ? (
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
              <Link href={`/`}>
                <span>Login</span>/
              </Link>
              <Link href={`/signup`}>
                <span>Signup</span>
              </Link>
            </div>
          )}
        </div>
      </div>
      {/* <div className={styles.Header}>
          <div className={styles.headerSec1Logo}>
            <Link href={`/`}>
              <img alt="logo" src={`/assets/Logo.png`} />
            </Link>
          </div>
          <div className={styles.headerSec2Links}>
            <ul>
              <li>Marketplace</li>
              <li onClick={() => router.push("/#howitworks")}>How it works</li>
            </ul>
          </div>
          <div className={styles.headerSec3SearchInput}>
            <input type="text" placeholder="Search" />
            <img alt="search icon" src={`/assets/searchIcon.svg`} />
          </div>
          <div
            className={styles.headerSec4Notification}
            onClick={() => {
              !active && !account
                ? router.push("/login")
                : setNotificationOpen(!notificationOpen);
              setProfileOpen(false);
            }}
          >
            <div className={styles.activeNotification}></div>
            {notificationOpen && (
              <div className={styles.notification}>
                <NewNotificationModal />
              </div>
            )}
          </div>
          <div className={styles.headerSec5Btns}>
            <button>Upload</button>
            {active && account ? (
              <div
                className={styles.balanceSec}
                onClick={() => {
                  setProfileOpen(!profileOpen);
                  setNotificationOpen(false);
                }}
              >
                <img alt="avatar" src={`/assets/Avator.svg`} />
                <p>
                  7.00698 <span>ETH</span>
                </p>
                {profileOpen && (
                  <div className={styles.profile}>
                    <NewProfileModal />
                  </div>
                )}
              </div>
            ) : (
              <div className={styles.auth}>
                <span onClick={login}>Login</span>/
                <span onClick={() => router.push("/signup")}>Signup</span>
              </div>
            )}
          </div>
        </div> */}
    </div>
  );
}
export default Header;
