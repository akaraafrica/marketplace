import React from "react";
import styles from "./index.module.scss";
import NextImage from "../Image";

function HotCollectionCard(data: any) {
  // console.log(data);
  const { images, title, author, items } = data.data;
  return (
    <div className={styles.root}>
      <div className={styles.mainImgdiv}>
        <NextImage
          className={styles.mainImg}
          src={images[0] || ""}
          layout="fill"
        />
      </div>
      <div className={styles.imagesDiv}>
        {images &&
          images.map((image: string, index: number) => (
            <div key={index} className={styles.images}>
              <NextImage
                className={styles.subImg}
                src={image || ""}
                layout="fill"
              />
            </div>
          ))}
      </div>
      <div className={styles.infoDiv}>
        <h4>{title && title}</h4>
        <div className={styles.bottom}>
          <div className={styles.left}>
            <NextImage
              className={styles.image}
              src={author.profile.avatar && author.profile.avatar}
              width="50px"
              height="50px"
            />
            <div className={styles.owner}>
              By {author.profile.name && author.profile.name}
            </div>
          </div>
          <span>{items && items.length} Items</span>
        </div>
      </div>
    </div>
  );
}
export default HotCollectionCard;
