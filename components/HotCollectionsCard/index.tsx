import React from "react";
import styles from "./index.module.scss";
import NextImage from "../Image";
import { ICollection } from "../../types/collection.interface";
import Link from "../Link";
import { getUserName } from "../../utils/helpers/getUserName";
interface properties {
  collection: ICollection;
}

function HotCollectionCard(props: properties) {
  const { id, images, title, author, items } = props.collection;

  return (
    <div className={styles.root}>
      <div className={styles.mainImgdiv}>
        {images[0] && (
          <Link href={`/collection/${id}`}>
            <a>
              <NextImage
                className={styles.mainImg}
                src={images[0] || ""}
                layout="fill"
              />
            </a>
          </Link>
        )}
      </div>
      <div className={styles.imagesDiv}>
        {images &&
          images.map((image: string, idx: number) => (
            <div key={idx} className={styles.images}>
              <a>
                <NextImage
                  className={styles.subImg}
                  src={image || ""}
                  layout="fill"
                />
              </a>
            </div>
          ))}
      </div>
      <div className={styles.infoDiv}>
        <h4>{title && title}</h4>
        <div className={styles.bottom}>
          <Link href={`/profile/${author?.id}`}>
            <div className={styles.left}>
              {author?.profile?.avatar && (
                <a>
                  <NextImage
                    className={styles.image}
                    src={author.profile.avatar}
                    width="50px"
                    height="50px"
                  />
                </a>
              )}
              <div className={styles.owner}>By {getUserName(author)}</div>
            </div>
          </Link>
          <span>{items && items.length} Items</span>
        </div>
      </div>
    </div>
  );
}
export default HotCollectionCard;
