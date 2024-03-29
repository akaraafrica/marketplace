/* eslint-disable @next/next/no-img-element */
// TODO: convert this to NextImage when given the chance
import React from "react";
import { Avatar } from "@mui/material";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import styles from "./styles.module.scss";
import { MdOutlineAddBox, MdVerified } from "react-icons/md";
import { CgArrowTopRight } from "react-icons/cg";
import DefaultAvatar from "../../global/DefaultAvatar";
import Link from "next/link";

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));

const SellersCard = ({ seller, index }: any) => {
  return (
    <div className={styles.sellerCardMain}>
      <Link href={`/profile/${seller.username}`}>
        <>
          <div className={styles.sellerCardHeaderCon}>
            <div className={styles.sellerCardHeader}>
              <span
                className={styles.sellerCardChip}
                style={{
                  backgroundColor:
                    index === 0
                      ? "#3772ff"
                      : index === 1
                      ? "#BE7B40"
                      : index === 2
                      ? "#FF8462"
                      : "#23262F",
                }}
              >
                <span className={styles.sellercardchipimg}>
                  <img
                    alt="trophy icon"
                    src={
                      index === 0
                        ? `/assets/TrophyIcon.svg`
                        : index === 2
                        ? "/assets/lightning.png"
                        : "/assets/donut.png"
                    }
                  />
                </span>
                <span className={styles.sellerCardNum}>#{index + 1}</span>
              </span>
              <span className={styles.topLeft}>
                <MdOutlineAddBox size={30} color="#777E90" />
                <CgArrowTopRight size={30} color="#353945" />
              </span>
            </div>
            <div className={styles.sellerCardDivider}></div>
          </div>
          <div className={styles.sellerCardBodyMain}>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={seller.verified ? <MdVerified size={25} /> : <></>}
            >
              {seller.profile && seller.profile.avatar ? (
                <Avatar
                  src={seller.profile.avatar}
                  alt="seller-photo"
                  className={styles.selercardavatar}
                />
              ) : (
                <div className={styles.defaultAvatar}>
                  <DefaultAvatar
                    username={seller.username}
                    url={seller.profile && seller.profile.avatar}
                    width="80px"
                    height="80px"
                    fontSize="8px"
                    walletAddress={seller.walletAddress}
                  />
                </div>
              )}
            </Badge>
            <div className={styles.sellerCardBody}>
              <span className={styles.sellerName}>{seller?.profile?.name}</span>
            </div>
          </div>
        </>
      </Link>
    </div>
  );
};

export default SellersCard;
