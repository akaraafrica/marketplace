import React from "react";
import { Avatar } from "@mui/material";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import styles from "./styles.module.scss";

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));

const SellersCard = () => {
  return (
    <div className={styles.sellerCardMain}>
      <div className={styles.sellerCardHeaderCon}>
        <div className={styles.sellerCardHeader}>
          <span className={styles.sellerCardChip}>
            <span
            className={styles.sellercardchipimg}
            ><img src={`/assets/TrophyIcon.svg`} /></span>
            <span className={styles.sellerCardNum}>#1</span>
          </span>
          <span>
            <span
              style={{ color: "white", width: "2vw", height: "2vw" }}
            ></span>
            <span
              style={{
                color: "white",
                width: "2vw",
                height: "2vw",
                marginLeft: "-0.4vw",
              }}
            ></span>
          </span>
        </div>
        <div className={styles.sellerCardDivider}></div>
      </div>
      <div className={styles.sellerCardBodyMain}>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            <SmallAvatar
              alt="Payton Harris"
              src="/static/images/avatar/1.jpg"
            />
          }
        >
          <Avatar
            src={`/assets/auctionAvatar.png`}
            alt="seller-photo"
            className={styles.selercardavatar}
          />
        </Badge>
        <div className={styles.sellerCardBody}>
          <span className={styles.sellerName}>Payton Harris</span>
          <span className={styles.sellerPrice}>
            2.456 <span className={styles.sellerPriceETHColor}>ETH</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SellersCard;
