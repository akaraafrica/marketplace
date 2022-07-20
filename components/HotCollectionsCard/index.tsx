import React from "react";
import styles from "./index.module.scss";
import avatar from "/assets/Avator.svg";
import NextImage from "../Image";

function HotCollectionCard(data: any) {
  console.log(data);
  return (
    <div className={styles.root}>
      <div className={styles.mainImgdiv}>
        <NextImage
          className={styles.mainImg}
          src={data.data.images[0]}
          layout="fill"
        />
      </div>
      <div className={styles.imagesDiv}>
        {data.data.images.map((image: string, index: number) => (
          <div key={index} className={styles.images}>
            <NextImage className={styles.subImg} src={image} layout="fill" />
          </div>
        ))}
      </div>
      <div className={styles.infoDiv}>
        <h4>{data.data.title}</h4>
        <div className={styles.bottom}>
          <div className={styles.left}>
            <NextImage
              className={styles.image}
              src={data.data.author.profile.avatar}
              width="50px"
              height="50px"
            />
            <div className={styles.owner}>
              By {data.data.author.profile.name}
            </div>
          </div>
          <span>{data.data.items.length} Items</span>
        </div>
      </div>
    </div>
  );
}
export default HotCollectionCard;
