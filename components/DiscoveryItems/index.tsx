import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "./index.module.scss";
import ProfileCard from "../ProfileCard/index";
import Discovery, { Filter } from "../../ds/discovery.ds";

interface properties {
  products: any;
  filterBy: Filter;
}

function DiscoveryItems({ products, filterBy }: properties) {
  const initial = products ? [...products?.slice(0, 8)] : [];
  const [items, setItems] = useState(products);
  useEffect(() => {
    setItems(products);
  }, [products]);
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
        {items?.map((item: any) => (
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
