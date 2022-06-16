/* eslint-disable @next/next/no-img-element */
// TODO: convert this to NextImage when given the chance

import React from "react";
import styles from "./index.module.scss";

function ListingMainCard() {
  const data = {
    bid:'1.125 ETH',
    stock: '18 in stock',
    image: '/assets/listingcardimg.png',
    avatar: '/assets/Avator.svg'
  }
  return (
    <div className={styles.listingmaincardcon}>
      <div className={styles.listingmaincard}>
        <div className={styles.listingmaincardsec1}>
          <img alt="listing card image" src={data.image} />
        </div>
        <div className={styles.listingmaincardcontentcon}>
          <div className={styles.listingmaincardsec1contentcon}>
            <img alt="avatar" src={data.avatar} />
            <div className={styles.listingcardsec1content}>
              <h4>The future of ETH®</h4>
              <p>{data.stock}</p>
            </div>
          </div>
          <div className={styles.listingcardsec2content}>
            <p>Highest bid</p>
            <div className={styles.listingcardsec2price}>
              <p className={styles.listingcardsec2price}>{data.bid}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ListingMainCard;
