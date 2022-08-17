/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useState, useEffect } from "react";
import styles from "./Items.module.scss";
import ItemCard from "./ItemCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import swiperClass from "swiper/types/swiper-class";
import { IItem } from "../../types/item.interface";
import { NoSsr } from "@mui/material";

interface properties {
  items: IItem[];
}

function Items({ items }: properties) {
  return (
    <div className={styles.container}>
      {items &&
        items.map((item: any, idx) => (
          <ItemCard
            key={idx}
            id={item.id}
            img={item.images[0]}
            name={item.title}
            price={item.price}
            stock={item.stock}
            ownerAvatar={`${item.owner?.profile?.avatar}`}
            highestBid={item.highestbid}
          />
        ))}
    </div>
  );
}
export default Items;
