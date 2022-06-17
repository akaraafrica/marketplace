import React from "react";
import styles from "./index.module.scss";
import { Badge, Box } from "@mui/material";
import Image from "next/image";

function UpdateFromCreators() {
  return (
    <div className={styles.updatefromcreatorscon}>
      <div className={styles.updatefromcreateor}>
        {/* <div className={styles.updatefromcreatorsec1}>
          <div className={styles.updatefromcreatornum}>
            <Badge color='success' badgeContent={2} anchorOrigin={{
              vertical: 'top',
              horizontal: 'left'
            }}></Badge>
          </div>
        </div> */}
        {/* <div style={{backgroundColor:'#000',borderRadius:'50%'}}> */}
        <Badge
          className={styles.badge}
          color="success"
          badgeContent={4}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <img
            alt="My avatar"
            src="/assets/Avator.svg"
            className={styles.avatar}
          />
        </Badge>
        {/* </div> */}
        <div className={styles.updatefromcreatorsec2}>
          <h4>Payton Harris</h4>
          <p>
            2.456<span>ETH</span>
          </p>
        </div>
      </div>
    </div>
  );
}
export default UpdateFromCreators;
