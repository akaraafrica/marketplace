import React from "react";
import styles from "./index.module.scss";
import NextImage from "../../Image";
import { ICollection } from "../../../types/collection.interface";
import Link from "../../Link";
interface properties {
  collection: ICollection;
}

function Collections({ collection }: properties) {
  const { id, images, title, author, items } = collection;
  const userStatus = collection?.contributors[0]?.confirmation;
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
            <h4>{title}</h4>
            <span
              style={{
                color: collection.status === "DRAFT" ? "orange" : "green",
              }}
            >
              {collection.status}
            </span>
          </div>
          <span style={{ color: "white", fontWeight: "800" }}>
            Contributor Status:{" "}
            <span
              style={{
                color:
                  userStatus === "ACCEPTED"
                    ? "green"
                    : userStatus === "PENDING"
                    ? "orange"
                    : "red",
              }}
            >
              {userStatus}
            </span>
          </span>
        </a>
      </Link>
    </div>
  );
}
export default Collections;
