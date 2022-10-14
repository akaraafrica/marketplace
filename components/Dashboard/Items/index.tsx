/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useState, useEffect } from "react";
import styles from "./index.module.scss";
import Index from "../ItemCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import swiperClass from "swiper/types/swiper-class";
import { IItem } from "../../../types/item.interface";
import { NoSsr } from "@mui/material";

interface properties {
  items: IItem[];
  auction?: boolean;
}

function Items({ items, auction }: properties) {
  return (
    <div className={styles.container}>
      {items &&
        items.map((item, idx) => {
          return auction ? (
            item?.auction?.open && (
              <Index
                key={idx}
                id={item.id}
                img={item.images[0]}
                name={item.title}
                price={item.price}
                ownerAvatar={`${item.owner?.profile?.avatar}`}
              />
            )
          ) : (
            <Index
              key={idx}
              id={item.id}
              img={item.images[0]}
              name={item.title}
              price={item.price}
              ownerAvatar={`${item.owner?.profile?.avatar}`}
            />
          );
        })}
    </div>
  );
}
export default Items;
