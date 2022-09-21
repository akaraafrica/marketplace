import { IItem } from "../../types/item.interface";
import NextImage from "../Image";
import styles from "./ItemGrid.module.scss";

export default function ItemGrid({
  items,
  title,
}: {
  items: any;
  title: string;
}) {
  return (
    <section className={styles.watchlist}>
      <h3>{title}</h3>
      <div className={styles.center}>
        {items.slice(0, 6).map((item: any) => {
          return (
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
                <span className={styles.cardName}>{item.title}</span>
                <div className={styles.previewcardprice}>
                  <span>{item.price} ETH</span>
                </div>
              </div>
              <button>Remove Item</button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
