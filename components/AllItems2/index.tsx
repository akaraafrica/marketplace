import React, { useState } from "react";
import styles from "./index.module.scss";
import ProfileCard from "../ProfileCard/index";
import InfiniteScroll from "react-infinite-scroll-component";

function AllItems({ products }: any) {
  // const initial = products.slice(0, 8);
  const [items, setItems] = useState(products);
  // console.log(products)

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
        {items.map((item: any) => (
          <div key={item.id} className={styles.container}>
            <ProfileCard
              ProductImg={`${item.images[0]}`}
              Name={item.title}
              Price={`${item.price} ETH`}
              Stock={"3 in stck"}
              Avatar={`${item.images[0]}`}
              HighestBid={"0.01"}
            />
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
}
export default AllItems;
