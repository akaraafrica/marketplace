/* eslint-disable @next/next/no-img-element */
// TODO: convert this to NextImage when given the chance

import { Box } from "@mui/material";
import React from "react";
import styles from "./index.module.scss";

function ListingSubCard() {
  return (
    <div className={styles.listingsubcardcon}>
      <div className={styles.listingsubcard}>
        <div className={styles.listingsubcardsec1}>
          <img alt="listing subcard" src={`/assets/listingsubcardimg.png`} />
        </div>
        <div className={styles.listingsubcardsec2}>
          <p className={styles.listingsubcardsec2heading}>ETH never die</p>
          <div className={styles.listingsubpricesec}>
            <img alt="avatar" src={`/assets/Avator.svg`} />
            <div className={styles.listingcardsec2pricecon}>
              <div className={styles.listingcardsec2price}>
                <p>1.125 ETH</p>
              </div>
            </div>
            <span>3 of 2</span>
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
