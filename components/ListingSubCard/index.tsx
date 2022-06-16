/* eslint-disable @next/next/no-img-element */
// TODO: convert this to NextImage when given the chance

import { Box } from "@mui/material";
import React from "react";
import styles from "./index.module.scss";

interface DT {
  image: string,
  avatar: string,
  value: string,
  number: string,
  title:string
}
function ListingSubCard({ image, avatar, value, number,title }: DT) {
  return (
    <div className={styles.listingsubcardcon}>
      <div className={styles.listingsubcard}>
        <div className={styles.listingsubcardsec1}>
          <img alt="listing subcard" src={image} />
        </div>
        <div className={styles.listingsubcardsec2}>
          <p className={styles.listingsubcardsec2heading}>{title}</p>
          <div className={styles.listingsubpricesec}>
            <img alt="avatar" src={avatar} />
            <div className={styles.listingcardsec2pricecon}>
              <div className={styles.listingcardsec2price}>
                <p>{value} </p>
              </div>
            </div>
            <span>{number} </span>
          </div>
          <div className={styles.listingcardsubsec2btn}>
            <button>Place a bid</button>
          </div>
        </div>

      </div>
    </div>
  );
}
export default ListingSubCard;
