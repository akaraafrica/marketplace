import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import ItemCard from "../ItemCard/index";
import { IItem } from "../../types/item.interface";

interface properties {
  initialItems: IItem[];
  filter: any;
}

function DiscoveryItems({ initialItems, filter }: properties) {
  const [items, setItems] = useState(initialItems);

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  return (
    <div className={styles.allitems}>
      {items?.map((item: any, idx) => {
        return (
          <ItemCard
            key={idx}
            id={item.id}
            img={item.images[0]}
            name={item.title}
            price={item.price}
            ownerAvatar={`${item.owner?.profile?.avatar}`}
            highestBid={item.highestbid}
          />
        );
      })}
    </div>
  );
}
export default DiscoveryItems;
