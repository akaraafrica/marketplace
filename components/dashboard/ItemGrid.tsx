import { IItem } from "../../types/item.interface";
import NextImage from "../Image";
import styles from "./ItemGrid.module.scss";

export default function ItemGrid({
  items,
  title,
}: {
  items: IItem[];
  title: string;
}) {
  return (
    <section className={styles.watchlist}>
      <h3>{title}</h3>
      <div className={styles.center}>
        {items.slice(0, 6).map((item) => {
          return (
            <div className={styles.cards} key={item.id}>
              <NextImage
                className={styles.cardImg}
                src={item.images[0]}
                width="160px"
                height="148px"
                alt="product"
              />
              <div className={styles.cardDetails}>
                <span className={styles.cardName}>{item.title}</span>
                {title == "watchlist" && (
                  <>
                    <div className={styles.centerDiv}>
                      <NextImage
                        className={styles.centerDivImg}
                        src="/assets/auctionAvatar.png"
                        width="24px"
                        height="24px"
                        alt="avatar"
                      />
                      <span>0.27 ETH</span>
                    </div>
                    <button>Place a bid</button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}