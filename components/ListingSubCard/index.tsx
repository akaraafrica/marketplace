/* eslint-disable @next/next/no-img-element */
// TODO: convert this to NextImage when given the chance

import { Box } from "@mui/material";
import { height } from "@mui/system";
import React from "react";
import NextImage from "../../utils/helpers/NextImage";
import styles from "./index.module.scss";

function ListingSubCard() {
  return (
    <div className={styles.listingsubcardcon}>
      <div className={styles.listingsubcard}>
        <div className={styles.listingsubcardsec1}>
          <NextImage
            src={`/assets/listingsubcardimg.png`}
            width={130}
            height={130}
          />
        </div>
        <div className={styles.listingsubcardsec2}>
          <p className={styles.listingsubcardsec2heading}>ETH never die</p>
          <div className={styles.listingsubpricesec}>
            <NextImage src={`/assets/Avator.svg`} height={60} width={40} />
            <p className={styles.listingcardsec2price}>1.125 ETH</p>
            <p>3 of 2</p>
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
