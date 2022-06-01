import React from "react";
import { Avatar } from "@mui/material";
import styles from "./styles.module.scss";
const BidCard = () => {
  return (
    <div>
      {" "}
      <div className={styles.bidSec}>
        <span className={styles.auctionHeading}>The Odogu Collection</span>
        <div className={styles.profileInfoCardCon}>
          <div className={styles.profileInfoCard}>
            <Avatar
              src={`/assets/auctionAvatar.png`}
              alt="creator-photo"
              style={{ width: "2.5vw", height: "2.5vw" }}
              className={styles.profileInfoAvatar}
            />
            <span className={styles.profileInfo}>
              <span className={styles.profileInfoClass}>Creator</span>
              <span className={styles.profileInfoDesc}>Sarah Shaibu</span>
            </span>
          </div>
          <div className={styles.profileInfoCard}>
            <Avatar
              src={`/assets/user.png`}
              alt="creator-photo"
              style={{ width: "2.5vw", height: "2.5vw" }}
              className={styles.profileInfoAvatar}
            />
            <span className={styles.profileInfo}>
              <span className={styles.profileInfoClass}>Instant price</span>
              <span className={styles.profileInfoDesc}>3.5 ETH</span>
            </span>
          </div>
        </div>
        <div className={styles.currentBidCon}>
          <div className={styles.currentBidSec}>
            <span className={styles.currentBid}>Current Bid</span>
            <span className={styles.priceETH}>1.00 ETH</span>
            <span className={styles.priceUSD}>$3,618.36</span>
          </div>
          <div className={styles.auctionEnding}>
            <span className={styles.auctionEndingText}>Auction ending in</span>
            <span className={styles.timerCon}>
              <span>
                <span className={styles.hours}>19</span>
                <span className={styles.hrs}>Hrs</span>
              </span>
              <span>
                <span className={styles.minutes}>24</span>
                <span className={styles.mins}>mins</span>
              </span>
              <span>
                <span className={styles.seconds}>19</span>
                <span className={styles.secs}>secs</span>
              </span>
            </span>
          </div>
        </div>
        <div>
          <button className={styles.bidBtn}>Place a bid</button>
          <button className={styles.viewBtn}>View item</button>
        </div>
      </div>
    </div>
  );
};

export default BidCard;