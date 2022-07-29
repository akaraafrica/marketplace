import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "./index.module.scss";
import ItemCard from "../ItemCard/index";
import Discovery, { Filter } from "../../ds/discovery.ds";
import { IItem } from "../../types/item.interface";

interface properties {
  initialItems: IItem[];
  filterBy: Filter;
}

function DiscoveryItems({ initialItems, filterBy }: properties) {
  const initial = initialItems ? [...initialItems?.slice(0, 8)] : [];
  const [items, setItems] = useState(initialItems);
  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  const fetchMoreData = async () => {
    let data = await Discovery.getData(filterBy);
    console.log({ data });
  };

  return (
    <InfiniteScroll
      dataLength={items?.length || 0}
      next={fetchMoreData}
      hasMore={true}
      loader={<h6 style={{ textAlign: "center" }}>Loading...</h6>}
    >
      <div className={styles.allitems}>
        {items?.map((item: any, idx) => (
          <ItemCard
            key={idx}
            id={item.id}
            img={`${item.images ?? item.images[0]}`}
            name={item.title}
            price={item.price}
            stock={item.stock}
            ownerAvatar={`${item.owner?.profile?.avatar}`}
            highestBid={item.highestbid}
          />
        ))}
      </div>
    </InfiniteScroll>
  );
}
export default DiscoveryItems;
