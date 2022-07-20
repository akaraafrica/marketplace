/* eslint-disable @next/next/no-img-element */
// TODO: convert this to NextImage when given the chance
import { useRouter } from "next/router";
import React from "react";
import NextImage from "../Image";
import styles from "./index.module.scss";

function ProfileCard(props: any) {
  const router = useRouter();
  const isMarketplace = router.pathname === "/marketplace";
  return (
    <div>
      <div
        className={
          isMarketplace ? styles.cardBackground : styles.previewcardcontentcon
        }
      >
        <div className={styles.previewcardimg}>
          <img alt="product image" src={props.ProductImg} />
        </div>
        {props.collections && (
          <div className={styles.collectionsimgs}>
            {props.collections.map((item: string, index: number) => (
              <NextImage
                className={styles.image}
                key={index}
                src={item}
                width="100%"
                height="60px"
              />
            ))}
          </div>
        )}
        <div className={styles.previewcardnamebox}>
          <span>{props.Name}</span>
          {!props.collections && (
            <div className={styles.previewcardprice}>
              <span>{props.Price} ETH</span>
            </div>
          )}
          {props.collections && <span>{props.Stock}</span>}
        </div>
        {!props.collections && (
          <div className={styles.previewstockcon}>
            <div className={styles.avatars}>
              <img alt="avatar" src={props.Avatar} />
              <img alt="avatar" src={props.Avatar} />
              <img alt="avatar" src={props.Avatar} />
            </div>
            <span>{props.Stock}</span>
          </div>
        )}
        {!props.collections && <hr />}

        {!props.collections && (
          <div className={styles.bidsec}>
            <div className={styles.bidsec1}>
              <img alt="bid icon" src={`/assets/bidicon.svg`} />
              <span>
                Highest bid <span> {props.HighestBid}</span>
              </span>
            </div>
            <div className="bidsec2">
              <span>New bid</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default ProfileCard;
