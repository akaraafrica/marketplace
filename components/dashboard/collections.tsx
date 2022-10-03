import React from "react";
import styles from "./Collections.module.scss";
import NextImage from "../Image";
import { ICollection } from "../../types/collection.interface";
import Link from "../Link";
interface properties {
  collection: ICollection;
}

function Collections(props: properties) {
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
      </div>
    </div>
  );
}
export default Collections;
