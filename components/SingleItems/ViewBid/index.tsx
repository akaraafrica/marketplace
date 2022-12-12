import { Dispatch, SetStateAction } from "react";
import { IItem } from "../../../types/item.interface";
import styles from "./index.module.scss";
import { IBid } from "../../../types/bid.interface";
import { getUserName } from "../../../utils/helpers/getUserName";
import DefaultAvatar from "../../global/DefaultAvatar";

export default function ViewBid({
  viewall,
  item,
  setTag,
}: {
  viewall?: boolean;
  item: IItem;
  setTag?: Dispatch<SetStateAction<number>>;
}) {
  const highestBid = item?.bids?.reduce(
    (prev, current) => (prev.amount > current.amount ? prev : current),
    { amount: 1 } as IBid
  );

  return (
    highestBid.user && (
      <div className={styles.viewBid}>
        {viewall &&
          item?.bids?.map((bid, index) => {
            return (
              <div key={index} className={styles.section}>
                <section className={styles.top}>
                  <DefaultAvatar
                    url={bid.user?.profile?.avatar}
                    width="40px"
                    height="40px"
                    fontSize="8px"
                    walletAddress={bid.user.walletAddress}
                    username={bid.user.username}
                  />
                  <div>
                    <h5>
                      <span>By {getUserName(bid.user)}</span>
                    </h5>
                    <h3>
                      <span>{bid.amount} ETH</span>
                    </h3>
                  </div>
                </section>
              </div>
            );
          })}
        {!viewall && highestBid && (
          <div className={styles.section}>
            {highestBid.user && (
              <section className={styles.top}>
                <DefaultAvatar
                  url={highestBid.user?.profile?.avatar}
                  width="40px"
                  height="40px"
                  fontSize="8px"
                  walletAddress={highestBid?.user?.walletAddress}
                  username={highestBid?.user.username}
                />
                <div>
                  <h5>
                    Highest bid by
                    <span> {getUserName(highestBid.user)}</span>
                  </h5>
                  <h3>
                    <span>{highestBid.amount} ETH</span>
                  </h3>
                </div>
              </section>
            )}{" "}
            <section className={styles.button}>
              <button onClick={() => setTag && setTag(3)}>View all</button>
            </section>
          </div>
        )}
      </div>
    )
  );
}
