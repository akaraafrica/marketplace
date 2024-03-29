import { DefaultContext } from "react-icons";
import { IItem } from "../../../types/item.interface";
import NextImage from "../../global/Image";
import styles from "./index.module.scss";
import DefaultAvatar from "../../global/DefaultAvatar";
import { getUserName } from "../../../utils/helpers/getUserName";

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
                    width="250px"
                    height="250px"
                    alt="product"
                  />
                )}

                <div className={styles.cardDetails}>
                  <span className={styles.cardName}>{item?.title}</span>
                  <div></div>
                  <span className={styles.title}>Current Owner</span>
                  <div className={styles.owner}>
                    <DefaultAvatar
                      fontSize=".6rem"
                      username={item?.owner?.username}
                      url={item?.owner?.profile?.avatar}
                      walletAddress={item?.owner?.walletAddress}
                      width="40px"
                      height="40px"
                    />
                    <span>{getUserName(item?.owner)}</span>
                  </div>
                </div>
                {/* {item.purchases.length > 0 && (
                  <div className={styles.history}>
                    <span className={styles.title}>Item purchase history</span>
                    <section className={styles.prices}>
                      {item.purchases?.map((purchase) => (
                        <div className={styles.purchase} key={purchase.id}>
                          <span>{getUserName(purchase.user)}</span>
                          <span>{purchase.amount} ETH</span>
                        </div>
                      ))}
                    </section>
                  </div>
                )} */}
              </div>
            );
          })}
      </div>
    </section>
  );
}
