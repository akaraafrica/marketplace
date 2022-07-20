import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
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
          <span className={styles.desc}>0.18 ETH received</span>
          <span className={styles.time}>3 days ago</span>
        </div>
      </div>
      <span className={styles.dot}></span>
    </div>
  );
};

const Index = () => {
  const router = useRouter();
  return (
    <div className={styles.root} style={{ zIndex: 1 }}>
      <div className={styles.top}>
        <div>Notifications</div>
        <span onClick={() => router.push("/notifications")}>See all</span>
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
