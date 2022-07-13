import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ProfileCard from "../ProfileCard/index";
import styles from "./index.module.scss";

function Video({ products }: any) {
  const initial = products.slice(0, 8);
  const [items, setItems] = useState([...initial]);

  const fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    let start = items.length;
    let end = items.length + 8;
    setTimeout(() => {
      setItems(items.concat(products.slice(start, end)));
    }, 1500);
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
          <div key={item.id} className={styles.container}>
            <ProfileCard
              ProductImg={`${item.image}`}
              Name={item.title}
              Price={item.price}
              Stock={item.stock}
              Avatar={`${item.biddersimg}`}
              HighestBid={item.highestbid}
            />
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
}
export default Video;
