import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "./index.module.scss";
import ItemCard from "../ItemCard/index";
import Discovery, { Filter } from "../../ds/discovery.ds";
import { IItem } from "../../types/item.interface";
import { ItemDs } from "../../ds";
import { useRouter } from "next/router";

interface properties {
  initialItems: IItem[];
  filterBy: Filter;
}

function DiscoveryItems({ initialItems, filterBy }: properties) {
  const [items, setItems] = useState(initialItems);
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter();

  const isMarketplace = router.pathname === "/marketplace";

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  const fetchMoreData = async () => {
    let data = await ItemDs.getMore(items.length);
    setItems([...items, ...data]);
    if (data.length == 0) {
      setHasMore(false);
    }
  };
  return (
    <InfiniteScroll
      dataLength={items?.length || 0}
      next={fetchMoreData}
      hasMore={isMarketplace ? hasMore : false}
      loader={<h6 style={{ textAlign: "center" }}>Loading...</h6>}
    >
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
    </InfiniteScroll>
  );
}
export default DiscoveryItems;
