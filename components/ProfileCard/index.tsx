/* eslint-disable @next/next/no-img-element */
// TODO: convert this to NextImage when given the chance
import React from "react";
import styles from "./index.module.scss";

function ProfileCard(props: any) {
  return (
    <div>
      <div className={styles.previewcardcontentcon}>
        <div className={styles.previewcardimg}>
          <img alt="product image" src={props.ProductImg} />
        </div>
        <div className={styles.previewcardnamebox}>
          <span>{props.Name}</span>
          <div className={styles.previewcardprice}>
            <span>{props.Price} ETH</span>
          </div>
        </div>
        <div className={styles.previewstockcon}>
          <div className={styles.avatars}>
            <img alt="avatar" src={props.Avatar} />
            <img alt="avatar" src={props.Avatar} />
            <img alt="avatar" src={props.Avatar} />
          </div>
          <span>{props.Stock}</span>
        </div>
        <hr />
        <div className={styles.bidsec}>
          <div className={styles.bidsec1}>
            <img alt="bid icon" src={`/assets/bidicon.svg`} />
            <span>
              Highest bid <span> {props.HighestBid}</span>
            </span>
          </div>
          <div className="bidsec2">
            <span>New bid</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProfileCard;
