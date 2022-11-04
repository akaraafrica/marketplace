import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useState, useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { toast } from "react-toastify";
import { IItem } from "../../../types/item.interface";
import styles from "./index.module.scss";
import AcceptBidDialog from "./../AcceptBidDialog";
import { BidDs } from "../../../ds";
import { IBid } from "../../../types/bid.interface";
import { getUserName } from "../../../utils/helpers/getUserName";
import DefaultAvatar from "../../DefaultAvatar";
import { useSWRConfig } from "swr";

export default function AcceptBid({
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
  const { user } = useContext(AuthContext);
  const { mutate } = useSWRConfig();

  const [open, setOpen] = useState(false);
  const [selectedBid, setSelectedBid] = useState<null | IBid>(null);

  const handleClose = () => setOpen(false);
  const handleAcceptBid = async () => {
    if (!user) {
      return;
    }
    try {
      const newData = {
        ...item,
        owner: selectedBid?.user,
        published: false,
        ownerId: selectedBid?.bidderId,
        auction: { open: false },
      };
      mutate("item" + item.id, () => newData, false);
      handleClose();
      toast.success("Bid Accepted Successfully");
      await BidDs.postData(
        "acceptBid",
        item,
        user,
        highestBid.amount,
        highestBid
      );
      mutate("item" + item.id);
    } catch (error) {
      toast.error("Error Placing Bid");
    }
  };
  return (
    highestBid.user && (
      <div className={styles.acceptbid}>
        {open && (
          <AcceptBidDialog
            open={open}
            handleAcceptBid={handleAcceptBid}
            handleClose={handleClose}
            item={item}
            selectedBid={selectedBid}
          />
        )}
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
                <section className={styles.button}>
                  <button
                    className={styles.accept}
                    onClick={() => {
                      setOpen(true);
                      setSelectedBid(bid);
                    }}
                  >
                    Accept
                  </button>
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
              <button
                className={styles.accept}
                onClick={() => {
                  setOpen(true);
                  setSelectedBid(highestBid);
                }}
              >
                Accept
              </button>
            </section>
          </div>
        )}
      </div>
    )
  );
}
