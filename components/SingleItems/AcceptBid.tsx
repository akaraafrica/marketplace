import { Avatar } from "@mui/material";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { IItem } from "../../types/item.interface";
import { randStr } from "../../utils/helpers/randomStr";
import styles from "./AcceptBid.module.scss";
import AcceptBidDialog from "./AcceptBidDialog";
import { BidDs } from "../../ds";

export default function AcceptBid({
  viewall,
  item,
  setTag,
}: {
  viewall?: boolean;
  item: IItem;
  setTag?: Dispatch<SetStateAction<number>>;
}) {
  const highestBid = item.bids[0];
  const { user, isAuthenticated, signOut } = useContext(AuthContext);
  const router = useRouter();
  const handleAcceptBid = async () => {
    const data = {
      userId: user?.id,
      itemId: item.id,
      amount: item.price,
      transactionId: randStr(20),
    };
    try {
      const res = BidDs.postData("acceptBid", data);
      toast.success("Bid Accepted Successfully");
      handleClose();
      setTimeout(() => {
        router.reload();
      }, 3000);
    } catch (error) {
      toast.error("Error Placing Bid");
    }
  };
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  return (
    <div className={styles.acceptbid}>
      {open && (
        <AcceptBidDialog
          open={open}
          handleAcceptBid={handleAcceptBid}
          handleClose={handleClose}
          item={item}
        />
      )}
      {viewall &&
        item?.bids?.map((bid, index) => {
          return (
            <div key={index} className={styles.section}>
              <section className={styles.top}>
                <Avatar
                  src={`/assets/auctionAvatar.png`}
                  alt="creator-photo"
                  sx={{ width: 50, height: 50 }}
                />
                <div>
                  <h5>
                    <span>By Kohaku Tora</span>
                  </h5>
                  <h3>
                    <span>{bid.amount} ETH</span>
                  </h3>
                </div>
              </section>
              <section className={styles.button}>
                <button className={styles.accept} onClick={() => setOpen(true)}>
                  Accept
                </button>
              </section>
            </div>
          );
        })}
      {!viewall && highestBid && (
        <div className={styles.section}>
          <section className={styles.top}>
            <Avatar
              src={`/assets/auctionAvatar.png`}
              alt="creator-photo"
              sx={{ width: 50, height: 50 }}
            />
            <div>
              <h5>
                Highest bid by
                <span> Kohaku Tora</span>
              </h5>
              <h3>
                <span>{highestBid?.amount} ETH</span>
              </h3>
            </div>
          </section>
          <section className={styles.button}>
            <button onClick={() => setTag && setTag(3)}>View all</button>
            <button className={styles.accept} onClick={() => setOpen(true)}>
              Accept
            </button>
          </section>
        </div>
      )}
    </div>
  );
}
