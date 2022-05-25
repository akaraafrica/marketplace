import React from "react";
import auctionAvatar from "/assets/auctionAvatar.png";
import { Avatar } from "@mui/material";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import "./styles.module.scss";
import Trophyicon from '/assets/TrophyIcon.svg'

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));

const SellersCard = () => {
  return (
    <div className="sellerCardMain">
      <div className="sellerCardHeaderCon">
        <div className="sellerCardHeader">
          <span className="sellerCardChip">
            <span
            className="sellercardchipimg"
            ><img src={Trophyicon} /></span>
            <span className="sellerCardNum">#1</span>
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
        <div className="sellerCardDivider"></div>
      </div>
      <div className="sellerCardBodyMain">
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
            src={auctionAvatar}
            alt="seller-photo"
            className="selercardavatar"
          />
        </Badge>
        <div className="sellerCardBody">
          <span className="sellerName">Payton Harris</span>
          <span className="sellerPrice">
            2.456 <span className="sellerPriceETHColor">ETH</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SellersCard;
