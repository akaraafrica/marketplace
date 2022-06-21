/* eslint-disable @next/next/no-img-element */
// TODO: convert this to NextImage when given the chance

import React from "react";
import styles from "./index.module.scss";
import { BsTriangleFill } from "react-icons/bs";

const Data = [
  {
    image: "/assets/notificationImg.png",
    recievedCoin: "ETH received",
    value: "0.08 ETH recived",
    time: "05 days ago",
  },
  {
    image: "/assets/notificationImg.png",
    recievedCoin: "BTC received",
    value: "0.08 BTC recived",
    time: "20 days ago",
  },
  {
    image: "/assets/notificationImg.png",
    recievedCoin: "USDT received",
    value: "0.48 USDT recived",
    time: "01 min ago",
  },
  {
    image: "/assets/notificationImg.png",
    recievedCoin: "USD received",
    value: "0.88 USD recived",
    time: "3 days ago",
  },
];
type DT = {
  image: string;
  recievedCoin: string;
  value: string;
  time: string;
};
const ShowMod = ({ image, recievedCoin, value, time }: DT) => {
  return (
    <div className={styles.notificationmodalcontent}>
      <div className={styles.notificstionmodalcontentseccon}>
        <div className={styles.notificstionmodalcontentsec1}>
          <img alt="notification image" src={image} />
        </div>
        <div className={styles.notificationmodalcontentsec2}>
          <h4>{recievedCoin} </h4>
          <h4 className={styles.value}>{value} </h4>
          <p>{time} </p>
        </div>
      </div>
      <div className={styles.acticeNotification}>
        <img alt="active" src={`/assets/active.svg`} />
      </div>
    </div>
  );
};
function NotificationModal() {
  return (
    <div className={styles.notificationModalCon}>
      <div className={styles.tooltipiconcon}>
        {/* <img className={styles.tooltipicon} src={toolTipIcon} /> */}
        {/* <img
          alt="notification image"
          className={styles.tooltipicon}
          src={`/assets/notificationImg.png`}
        /> */}
        <BsTriangleFill className={styles.icon} />
      </div>
      <div className={styles.notificationModal}>
        <div className={styles.notificationModalHead}>
          <h1>Notification</h1>
          <button
            onClick={() =>
              alert(`
          
          `)
            }
          >
            See all
          </button>
        </div>
        {Data.map((notification, i) => (
          <span key={i} className={styles.container}>
            <ShowMod
              image={notification.image}
              recievedCoin={notification.recievedCoin}
              value={notification.value}
              time={notification.time}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
export default NotificationModal;
