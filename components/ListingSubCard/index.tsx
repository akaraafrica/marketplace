/* eslint-disable @next/next/no-img-element */
// TODO: convert this to NextImage when given the chance

import { Typography } from "@mui/material";
import React from "react";
import NextImage from "../global/Image";
import styles from "./index.module.scss";

interface DT {
  image: string;
  avatar: string;
  value: string;
  number: string;
  title: string;
}
function ListingSubCard({ image, avatar, value, number, title }: DT) {
  return (
    <div className={styles.cont}>
      <NextImage src={image} height={180} width={180} alt="item" />

      <div className={styles.rightcard}>
        <Typography sx={{ color: "white" }}> {title}</Typography>
        <div className={styles.first}>
          <NextImage src={avatar} height={60} width={40} alt="avatar" />
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
            {value}
          </Typography>
          <Typography sx={{ color: "white", fontSize: "10px" }}>
            {" "}
            {number}
          </Typography>
        </div>
        <button>Place a bid</button>
      </div>
    </div>
  );
}
export default ListingSubCard;
