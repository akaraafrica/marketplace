/* eslint-disable @next/next/no-img-element */
// TODO: convert this to NextImage when given the chance

import React from "react";
import styles from "./index.module.scss";

function NotificationModal() {
  return (
    <div className={styles.notificationModalCon}>
      <div className={styles.tooltipiconcon}>
        {/* <img className={styles.tooltipicon} src={toolTipIcon} /> */}
        <img
          alt="notification image"
          className={styles.tooltipicon}
          src={`/assets/notificationImg.png`}
        />
      </div>
      <div className={styles.notificationModal}>
        <div className={styles.notificationModalHead}>
          <h1>Notification</h1>
          <button>See all</button>
        </div>
        <div className={styles.notificationmodalcontent}>
          <div className={styles.notificstionmodalcontentseccon}>
            <div className={styles.notificstionmodalcontentsec1}>
              <img
                alt="notification image"
                src={`/assets/notificationImg.png`}
              />
            </div>
            <div className={styles.notificationmodalcontentsec2}>
              <h4>ETH received</h4>
              <h4>0.08 ETH recived</h4>
              <p>2 days ago</p>
            </div>
          </div>
          <div className={styles.acticeNotification}>
            <img alt="active image" src={`/assets/active.svg`} />
          </div>
        </div>
        <div className={styles.notificationmodalcontent}>
          <div className={styles.notificstionmodalcontentseccon}>
            <div className={styles.notificstionmodalcontentsec1}>
              <img
                alt="notification image"
                src={`/assets/notificationImg.png`}
              />
            </div>
            <div className={styles.notificationmodalcontentsec2}>
              <h4>ETH received</h4>
              <h4>0.08 ETH recived</h4>
              <p>2 days ago</p>
            </div>
          </div>
          <div className={styles.acticeNotification}>
            <img alt="active" src={`/assets/active.svg`} />
          </div>
        </div>
        <div className={styles.notificationmodalcontent}>
          <div className={styles.notificstionmodalcontentseccon}>
            <div className={styles.notificstionmodalcontentsec1}>
              <img
                alt="notification image"
                src={`/assets/notificationImg.png`}
              />
            </div>
            <div className={styles.notificationmodalcontentsec2}>
              <h4>ETH received</h4>
              <h4>0.08 ETH recived</h4>
              <p>2 days ago</p>
            </div>
          </div>
          <div className={styles.acticeNotification}>
            <img alt="active" src={`/assets/active.svg`} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default NotificationModal;
