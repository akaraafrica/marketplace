/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React from "react";
import NextImage from "../Image";
import styles from "./ItemCard.module.scss";
import Link from "../Link";

interface ItemCardProps {
  id: number;
  img: string;
  name: string;
  price: number;
  stock: string;
  ownerAvatar: string;
  highestBid: string;
  collectionImages?: string[];
}

function ItemCard(props: ItemCardProps) {
  return (
    <div>
      <div className={styles.previewcardcontentcon}>
        <div className={styles.previewcardimg}>
          <Link href={`/item/${props.id}`}>
            <img alt="product image" src={props.img} />
          </Link>
        </div>

        <div className={styles.previewcardnamebox}>
          <span>{props.name}</span>
          <div className={styles.previewcardprice}>
            <span>{props.price} ETH</span>
          </div>
          {props.collectionImages && <span>{props.stock}</span>}
        </div>
        {/* <div className={styles.previewstockcon}>
          <div className={styles.avatars}>
            <img alt="avatar" src={props.ownerAvatar} />
            <img alt="avatar" src={props.ownerAvatar} />
            <img alt="avatar" src={props.ownerAvatar} />
          </div>
          <span>{props.stock}</span>
        </div>
        {!props.collectionImages && <hr />}

        {!props.collectionImages && (
          <div className={styles.bidsec}>
            <div className={styles.bidsec1}>
              <img alt="bid icon" src={`/assets/bidicon.svg`} />
              <span>
                Highest bid <span> {props.highestBid}</span>
              </span>
            </div>
            <div className="bidsec2">
              <span>New bid</span>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}
export default ItemCard;
