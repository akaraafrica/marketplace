import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "./index.module.scss";
import ProfileCard from "../ProfileCard/index";
import Discovery, { Filter } from "../../ds/discovery.ds";

interface properties {
  products: any;
  filterBy: Filter;
}

function DiscoveryItems({ products, filterBy }: properties) {
  const initial = products ? [...products.slice(0, 8)] : [];
  const [items, setItems] = useState(initial);

  const fetchMoreData = async () => {
    let data = await Discovery.getData(filterBy);
    setItems(data);
  };

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchMoreData}
      hasMore={true}
      loader={<h6 style={{ textAlign: "center" }}>Loading...</h6>}
    >
      <div className={styles.allitems}>
        {items.map((item) => (
          <ProfileCard
            key={item.id}
            ProductImg={`${item.images ?? item.images[0]}`}
            Name={item.title}
            Price={item.price}
            Stock={item.stock}
            Avatar={`${item.owner?.profile?.avatar}`}
            HighestBid={item.highestbid}
          />
        ))}
      </div>
    </InfiniteScroll>
  );
}
export default DiscoveryItems;
