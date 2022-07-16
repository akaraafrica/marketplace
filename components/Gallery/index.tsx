import React from "react";
import styles from "./index.module.scss";
import ProfileCard from "../ProfileCard";

function Gallery({ items }: any) {
  return (
    <div className={styles.gallery}>
      {items.map((item: any) => (
        <ProfileCard
          key={item.id}
          ProductImg={item.images[0]}
          Name={item.title}
          Price={item.price}
          Stock="3 in stock"
          Avatar={item.images[0]}
          HighestBid="0.001 ETH"
        />
      ))}
    </div>
  );
}
export default Gallery;
