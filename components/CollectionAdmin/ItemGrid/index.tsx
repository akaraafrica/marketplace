import Link from "next/link";
import { ICollection } from "../../../types/collection.interface";
import { IUser } from "../../../types/user.interface";
import NextImage from "../../Image";
import styles from "./index.module.scss";

export default function ItemGrid({
  title,
  collection,
  user,
}: {
  user: IUser;
  collection: ICollection;
  title: string;
}) {
  return (
    <section className={styles.watchlist}>
      <h3>{title}</h3>
      <div className={styles.center}>
        {collection.items.map((item: any) => {
          return (
            <Link key={item.id} href={`/item/${item.id}`}>
              <div className={styles.cards} key={item.id}>
                <NextImage
                  className={styles.cardImg}
                  src={
                    item?.images
                      ? item?.images[0]
                      : `/assets/placeholder-image.jpg`
                  }
                  width="250px"
                  height="250px"
                  alt="product"
                />

                <div className={styles.cardDetails}>
                  <span className={styles.cardName}>{item?.title}</span>
                  <div className={styles.previewcardprice}>
                    <span>{item?.price} ETH</span>
                  </div>
                </div>
                {collection.author.id === user?.id && (
                  <button>Remove Item</button>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
