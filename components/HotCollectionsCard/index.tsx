import React from "react";
import styles from "./index.module.scss";
import NextImage from "../Image";
import { IItem } from "../../types/item.interface";
import { IUser } from "../../types/user.interface";
import { ICollection } from "../../types/collection.interface";
import Link from "../Link";
interface properties {
  collection: ICollection;
}

function HotCollectionCard(props: properties) {
  const { id, images, title, author, items } = props.collection;

  return (
    <div className={styles.root}>
      <div className={styles.mainImgdiv}>
        <Link href={`/collection/${id}`}>
          <NextImage
            className={styles.mainImg}
            src={images[0] || ""}
            layout="fill"
          />
        </Link>
      </div>
      <div className={styles.imagesDiv}>
        {images &&
          images.map((image: string, idx: number) => (
            <div key={idx} className={styles.images}>
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
          <Link href={`/profile/${author.id}`}>
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
          </Link>
          <span>{items && items.length} Items</span>
        </div>
      </div>
    </div>
  );
}
export default HotCollectionCard;
