import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import NextImage from "../../components/Image";
import styles from "./index.module.scss";
import { INotification } from "../../types/notification.interface";
import getNiceDate from "../../utils/helpers/dateFormatter";

const Item = ({ data }: { data: INotification }) => {
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
          <span className={styles.title}>{data.title}</span>
          {/* <span className={styles.desc}>0.18 ETH received</span> */}
          <span className={styles.time}>{getNiceDate(data.createdAt)}</span>
        </div>
      </div>
      <span className={styles.dot}></span>
    </div>
  );
};

const Index = ({ data }: { data: INotification[] }) => {
  const router = useRouter();
  return (
    <div className={styles.root} style={{ zIndex: 1 }}>
      <div className={styles.top}>
        <div>Notifications</div>
        <span onClick={() => router.push("/notifications")}>See all</span>
      </div>
      <div className={styles.body}>
        {data.length &&
          data.map((notification) => {
            return (
              <div key={notification.id}>
                <Item data={notification} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Index;
