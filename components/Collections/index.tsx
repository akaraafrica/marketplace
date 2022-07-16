import React from "react";
import styles from "./index.module.scss";
import ProfileCard from "../ProfileCard/index";

function Collections({ items }: any) {
  return (
    <div className={styles.collections}>
      {items.map((item: any) => (
        <ProfileCard
          key={item.id}
          ProductImg={item.images[0]}
          Name={item.title}
          Price={item.price}
          Stock="3 in stock"
          Avatar={item.owner.profile.avatar}
          HighestBid="0.001 ETH"
        />
      ))}
    </div>
  );
}
export default Collections;
