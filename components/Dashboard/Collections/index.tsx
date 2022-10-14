import React from "react";
import styles from "./index.module.scss";
import NextImage from "../../Image";
import { ICollection } from "../../../types/collection.interface";
import Link from "../../Link";
interface properties {
  collection: ICollection;
}

function Collections(props: properties) {
  const { id, images, title, author, items } = props.collection;
  return (
    <div className={styles.root}>
      <Link href={`/collection/${id}/admin`} passHref>
        <a>
          <div className={styles.mainImgdiv}>
            <NextImage
              className={styles.mainImg}
              src={images[0] || ""}
              layout="fill"
            />
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
        </a>
      </Link>
    </div>
  );
}
export default Collections;
