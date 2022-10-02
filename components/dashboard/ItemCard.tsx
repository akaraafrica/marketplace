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
  ownerAvatar: string;
}

function ItemCard(props: ItemCardProps) {
  return (
    <div className={styles.previewcardcontentcon}>
      <Link href={`/item/${props.id}`}>
        <a>
          <div className={styles.previewcardimg}>
            <img alt="product image" src={props.img} />
          </div>

          <div className={styles.previewcardnamebox}>
            <span>{props.name}</span>
            <div className={styles.previewcardprice}>
              <span>{props.price} ETH</span>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
}
export default ItemCard;
