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
      {/* <img src={`/assets/listingsubcardimg.png`} className={styles.image} /> */}
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

    // <div className={styles.listingsubcardcon}>
    //   <div className={styles.listingsubcard}>
    //     <div className={styles.listingsubcardsec1} style={{

    //       backgroundImage: 'url(/assets/listingsubcardimg.png)', height:"200px", width:"200px", backgroundRepeat:"no-repeat"
    //     }}>

    //     </div>

    //     <div className={styles.listingsubcardsec2}>
    //       <p className={styles.listingsubcardsec2heading}>ETH never die</p>
    //       <div className={styles.listingsubpricesec}>

    //         <span className={styles.listingcardsec2price}>1.125 ETH</span>

    //         <p>3 of 2</p>
    //       </div>
    //       <div className={styles.listingcardsubsec2btn}>
    //         <button>Place a bid</button>
    //       </div>
    //     </div>
    //     <Box sx={{display:"flex", flexDirection:"column", paddingLeft:"10px"}}>
    //       <Typography> ETH never die</Typography>
    //     <Box sx={{display:"flex", justifyContent:"space-around", alignItems:"center"}}>
    //     <NextImage src={`/assets/Avator.svg`} height={60} width={40} />
    //     <Typography sx={{color:"green", fontSize:{xs:6,sm:8,md:12,lg:12}, borderWidth:"2px",borderStyle:"solid",borderColor:"green", borderRadius:"2px"}}>1.125 ETH </Typography>
    //     <Typography> 2 of 3</Typography>

    //     </Box>
    //     <div className={styles.listingcardsubsec2btn}>
    //         <button>Place a bid</button>
    //       </div>
    //     </Box>
    //   </div>
    // </div>
  );
}
export default ListingSubCard;
