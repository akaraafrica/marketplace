/* eslint-disable @next/next/no-img-element */
// TODO: convert this to NextImage when given the chance

import { Box, Typography } from "@mui/material";
import React from "react";
import NextImage from "../../utils/helpers/NextImage";
import styles from "./index.module.scss";

function ListingMainCard() {
  return (
    <div className={styles.listingmaincardcon}>
      <div className={styles.listingmaincard}>
        <div
          className={styles.listingmaincardsec1}
          style={{
            backgroundImage: "url(/assets/listingcardimg.png)",
            width: "100%",
            height: "500px",
            backgroundRepeat: "no-repeat",
            objectFit: "cover",
            backgroundSize: "cover",
          }}
        ></div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            maxHeight: "51px",
            paddingBottom: "10px",
            marginTop: "20px",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
            <div>
              <NextImage src={`/assets/Avator.svg`} height={80} width={60} />
            </div>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
              }}
            >
              <Typography color={"white"} sx={{ fontWeight: 600 }}>
                {" "}
                The future of ETH®
              </Typography>
              <Typography
                sx={{
                  width: "100%",
                  fontSize: { sm: "8px", xs: "8px", md: "14px", lg: "14px" },
                }}
              >
                {" "}
                18 in stock
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <Typography
              sx={{
                fontSize: { sm: "10px", xs: "10px", md: "14px", lg: "14px" },
              }}
            >
              {" "}
              Highest bid
            </Typography>
            <Typography
              sx={{
                color: "green",
                border: "1px solid green",
                borderRadius: "5px",
                fontWeight: 400,
                padding: "5px",
              }}
            >
              {" "}
              1.125ETH{" "}
            </Typography>
          </Box>
        </Box>
      </div>
    </div>
  );
}
export default ListingMainCard;
