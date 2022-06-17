/* eslint-disable @next/next/no-img-element */
// TODO: convert this to NextImage when given the chance
import React from "react";
import styles from "./index.module.scss";
import NotificationModal from "../NotificationModal/index";
import ProfileModal from "../ProfileModal/index";
import MobileHeader from "../MobileHeader/index";

function Header() {
  const [notificationOpen, setNotificationOpen] = React.useState(false);
  const [profileOpen, setProfileOpen] = React.useState(false);
  return (
    <div>
      <div className={styles.headerCon}>
        <div className={styles.mobileheadercon}>
          <div className={styles.mobileHeaderupper}>
            <img alt="logo" src={`/assets/Logo.png`} />
            <MobileHeader />
          </div>
        </div>
        <div className={styles.Header}>
          <div className={styles.headerSec1Logo}>
            <img alt="logo" src={`/assets/Logo.png`} />
          </div>
          <div className={styles.headerSec2Links}>
            <ul>
              <li>Marketplace</li>
              <li>How it works</li>
            </ul>
          </div>
          <div className={styles.headerSec3SearchInput}>
            <input type="text" placeholder="Search" />
            <img alt="search icon" src={`/assets/searchIcon.svg`} />
          </div>
          <div
            className={styles.headerSec4Notification}
            onClick={() => {
              setNotificationOpen(!notificationOpen);
              setProfileOpen(false);
            }}
          >
            <div className={styles.activeNotification}></div>
          </div>
          <div className={styles.headerSec5Btns}>
            <button>Upload</button>
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
            </div>
          </div>
        </div>
      </div>
      <div className={styles.modals}>
        {notificationOpen && <NotificationModal />}
        {profileOpen && <ProfileModal />}
      </div>
    </div>
  );
}
export default Header;
