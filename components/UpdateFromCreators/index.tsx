/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./index.module.scss";
import { Badge } from "@mui/material";
interface DT {
  badgecontent: number;
  name: string;
  value: string;
  avatar: string;
}
function UpdateFromCreators({ badgecontent, name, value, avatar }: DT) {
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
          badgeContent={badgecontent}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <img alt="My avatar" src={avatar} className={styles.avatar} />
        </Badge>
        {/* </div> */}
        <div className={styles.updatefromcreatorsec2}>
          <h4>{name}</h4>
          <p>
            {value}
            <span>ETH</span>
          </p>
        </div>
      </div>
    </div>
  );
}
export default UpdateFromCreators;
