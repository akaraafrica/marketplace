/* eslint-disable @next/next/no-img-element */
// TODO: convert this to NextImage when given the chance

import { Box, Typography } from "@mui/material";
import { height } from "@mui/system";
import React from "react";
import NextImage from "../../utils/helpers/NextImage";
import styles from "./index.module.scss";

function ListingSubCard() {
  return (
    <div className={styles.cont}>
      <NextImage
        src={`/assets/listingsubcardimg.png`}
        height="180px"
        width="180px"
      />

      <div className={styles.rightcard}>
        <Typography sx={{ color: "white" }}> ETH never die </Typography>
        <div className={styles.first}>
          <NextImage src={`/assets/Avator.svg`} height={60} width={40} />
          <Typography
            sx={{
              color: "green",
              border: "1px solid green",
              fontSize: "10px",
              borderRadius: "3px",
              padding: "5px",
            }}
          >
            {" "}
            0.277 ETH
          </Typography>
          <Typography sx={{ color: "white", fontSize: "10px" }}>
            {" "}
            2 0f 3
          </Typography>
        </div>
        <button>Place a bid</button>
      </div>
    </div>
  );
}
export default ListingSubCard;
