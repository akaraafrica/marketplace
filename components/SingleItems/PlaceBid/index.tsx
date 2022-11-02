import { useState, useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { BidDs } from "../../../ds";
import styles from "./index.module.scss";
import { toast } from "react-toastify";
import PlaceBidDialog from "../PlaceBidDialog";
import PurchaseDialog from "../PurchaseDialog";
import SuccessDialog from "../SuccessDialog";
import { IItem } from "../../../types/item.interface";
import { useSWRConfig } from "swr";

export default function PlaceBid({ item }: { item: IItem }) {
  const [openPlaceBidDialog, setOpenPlaceBidDialog] = useState(false);
  const [openPurchaseDialog, setOpenPurchaseDialog] = useState(false);
  const [openSucceesDialog, setOpenSuccessDialog] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);

  const [amount, setAmount] = useState<number | null>(null);
  const { user } = useContext(AuthContext);
  const { mutate } = useSWRConfig();

  const handleBidClose = () => {
    setOpenPlaceBidDialog(false);
  };
  const handlePurchaseClose = () => {
    setOpenPurchaseDialog(false);
  };
  const handleSuccessClose = () => {
    setOpenSuccessDialog(false);
  };

  const handlePlaceBid = async () => {
    if (!user) {
      return;
    }
    try {
      if (amount) await BidDs.postData("placeBid", item, user, amount);
      mutate(["item", item.id]);
      toast.success("Bid Placed Successfully");
      handleBidClose();
      setAmount(null);
    } catch (error) {
      toast.error("Error Placing Bid");
    }
  };
  const handlePurchaseNow = async () => {
    if (!user) {
      return;
    }
    try {
      await BidDs.postData("purchase", item, user);
      mutate(["item", item.id]);
      setOpenSuccessDialog(true);
      handlePurchaseClose();
    } catch (error) {
      toast.error("purchasing Bid");
    }
  };

  const itemUserBid = item?.bids?.filter((x) => x.bidderId === user?.id);

  return (
    <>
      <PlaceBidDialog
        open={openPlaceBidDialog}
        handleClose={handleBidClose}
        setAmount={setAmount}
        item={item}
        amount={amount}
        handlePlaceBid={handlePlaceBid}
      />
      <PurchaseDialog
        open={openPurchaseDialog}
        handleClose={handlePurchaseClose}
        amount={amount}
        item={item}
        handlePurchaseNow={handlePurchaseNow}
      />
      <SuccessDialog
        open={openSucceesDialog}
        handleClose={handleSuccessClose}
        item={item}
      />
      <div className={styles.placebid}>
        {item?.auction?.open && itemUserBid?.length > 0 && (
          <section className={styles.top}>
            <div>
              <h2 className={styles.userbid}>Your Bids</h2>
              {itemUserBid?.map((bid, index) => {
                return (
                  <h5 key={index}>
                    <span>{index + 1} - </span>
                    {bid.amount} ETH{" "}
                  </h5>
                );
              })}
            </div>
          </section>
        )}
        {(item?.auction?.open || item.published) && (
          <section className={styles.button}>
            {item?.published && (
              <button
                onClick={() => {
                  if (!user) {
                    toast.error("please login first");
                    return;
                  }
                  setOpenPurchaseDialog(true);
                }}
              >
                Purchase now
              </button>
            )}
            {item?.auction?.open && (
              <button
                onClick={() => {
                  if (!user) {
                    toast.error("please login first");
                    return;
                  }
                  setOpenPlaceBidDialog(true);
                }}
              >
                place a bid
              </button>
            )}
          </section>
        )}
      </div>
    </>
  );
}
