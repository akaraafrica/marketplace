/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useState, useEffect } from "react";
import styles from "./index.module.scss";
import Index from "../ItemCard";
import { IItem } from "../../../types/item.interface";

interface properties {
  items: IItem[];
  auction?: boolean;
  title?: string;
}

function Items({ items, auction, title }: properties) {
  return (
    <>
      <h3 className={styles.header3}>{title}</h3>
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
    </>
  );
}
export default Items;
