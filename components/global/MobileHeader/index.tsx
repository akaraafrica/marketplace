/* eslint-disable @next/next/no-img-element */
// TODO: convert this to NextImage when given the chance

import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import styles from "./index.module.scss";
import Divider from "@mui/material/Divider";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import ProfileModal from "../../Profile/ProfileModal/index";
import NotificationModal from "../NotificationModal/index";
import NextImage from "../Image";

export default function SwipeableTemporaryDrawer() {
  const [notificationOpen, setNotificationOpen] = React.useState(false);
  const [profileOpen, setProfileOpen] = React.useState(false);
  const [state, setState] = React.useState({
    top: false,
  });
  console.log(state);
  const toggleDrawer = (anchor: any, open: any) => (event: any) => {
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor: any) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
    >
      <div className={styles.mobileheadercontent}>
        <div className={styles.mobileHeaderupper}>
          <NextImage
            width={100}
            height={100}
            alt="logo"
            src={`/assets/Logo.png`}
          />
          <button onClick={toggleDrawer(anchor, false)}>
            <CloseIcon style={{ height: "10vw", width: "10vw" }} />
          </button>
        </div>
        <div className={styles.mobileheaderdivider}></div>
        <div className={styles.mobileheaderSearchInputcon}>
          <div className={styles.mobileheaderSearchInput}>
            <input type="text" placeholder="Search" />
            <img alt="search icon" src={`/assets/searchIcon.svg`} />
          </div>
        </div>
        <div className={styles.mobilenotificationseccon}>
          <div
            onClick={() => {
              setProfileOpen(!profileOpen);
              setNotificationOpen(false);
            }}
            className={styles.mobilenotificationsec}
          >
            <div className={styles.mobileprofile}>
              <img alt="avatar" src={`/assets/Avator.svg`} />
              <span>7.00698 ETH</span>
            </div>
            <ArrowDropDownIcon />
          </div>
        </div>
        {profileOpen && <ProfileModal />}
        <div className={styles.mobileheaderdivider}></div>
        <div className={styles.mobilenotificationseccon}>
          <div
            onClick={() => {
              setNotificationOpen(!notificationOpen);
              setProfileOpen(false);
            }}
            className={styles.mobilenotificationsec}
          >
            <span>Notifications</span>
            <ArrowDropDownIcon />
          </div>
        </div>
        {notificationOpen && <NotificationModal />}
        <div className={styles.mobileheaderdivider}></div>
        <div className={styles.mobileheaderlink}>
          <span>Marketplace</span>
        </div>
        <div className={styles.mobileheaderdivider}></div>
        <div className={styles.mobileheaderlink}>
          <span>How it works</span>
        </div>
        <div className={styles.mobileheaderdivider}></div>
        <div className={styles.mobileuploadbtn}>
          <button>Upload</button>
        </div>
      </div>
      <div className={styles.mobilemodals}></div>
    </Box>
  );

  return (
    <div>
      <div>
        {["top"].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button onClick={toggleDrawer(anchor, true)}>
              <MenuIcon style={{ height: "10vw", width: "10vw" }} />
            </Button>
            <SwipeableDrawer
              // anchor={anchor}
              // open={state[anchor]}
              anchor={"right"}
              open={state["top"]}
              onClose={toggleDrawer(anchor, false)}
              onOpen={toggleDrawer(anchor, true)}
            >
              {list(anchor)}
            </SwipeableDrawer>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
