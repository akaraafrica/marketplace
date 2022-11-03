import { IItem } from "../../../types/item.interface";
import NextImage from "../../Image";
import styles from "./index.module.scss";

export default function Index({
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
        {items &&
          items.slice(0, 6).map((item) => {
            return (
              <div className={styles.cards} key={item?.id}>
                {item?.images[0] && (
                  <NextImage
                    className={styles.cardImg}
                    src={item.images[0]}
                    width="160px"
                    height="148px"
                    alt="product"
                  />
                )}

                <div className={styles.cardDetails}>
                  <span className={styles.cardName}>{item?.title}</span>
                  {title == "watchlist" && (
                    <>
                      <div className={styles.centerDiv}>
                        {/* <NextImage
                        className={styles.centerDivImg}
                        src="/assets/auctionAvatar.png"
                        width="24px"
                        height="24px"
                        alt="avatar"
                      /> */}
                        <span>{item?.price} ETH</span>
                      </div>
                      <button>Place a bid</button>s
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
