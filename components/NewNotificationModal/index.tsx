import React from "react";
import Link from "next/link";
import NextImage from "../../components/Image";
import styles from "./index.module.scss";

const Item = () => {
  return (
    <div className={styles.item}>
      <div className={styles.left}>
        <NextImage
          className={styles.img}
          src="/assets/productimg6.png"
          width="70px"
          height="70px"
        />
        <div className={styles.details}>
          <span className={styles.title}>ETH received</span>
          <span className={styles.desc}>0.08 ETH received</span>
          <span className={styles.time}>3 days ago</span>
        </div>
      </div>
      <span className={styles.dot}></span>
    </div>
  );
};

const Index = () => {
  return (
    <div className={styles.root}>
      <div className={styles.top}>
        <div>Notifications</div>
        <Link href={`/notifications`}>
          <span>See all</span>
        </Link>
      </div>
      <div className={styles.body}>
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </div>
    </div>
  );
};

export default Index;
