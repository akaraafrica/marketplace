import { Avatar, Backdrop } from "@mui/material";
import { useUser } from "../../contexts/UserContext";
import { BidDs } from "../../ds";
import styles from "./PlaceBid.module.scss";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useState } from "react";
import PlaceBidDialog from "./PlaceBidDialog";
import PurchaseDialog from "./PurchaseDialog";
import SuccessDialog from "./SuccessDialog";
import { IItem } from "../../types/item.interface";

export default function PlaceBid({ item }: { item: IItem }) {
  const router = useRouter();
  const [openPlaceBidDialog, setOpenPlaceBidDialog] = useState(false);
  const [openPurchaseDialog, setOpenPurchaseDialog] = useState(false);
  const [openSucceesDialog, setOpenSuccessDialog] = useState(false);
  const [amount, setAmount] = useState(0);

  const handleBidClose = () => {
    setOpenPlaceBidDialog(false);
  };
  const handlePurchaseClose = () => {
    setOpenPurchaseDialog(false);
  };
  const handleSuccessClose = () => {
    setOpenSuccessDialog(false);
  };
  const user = useUser()?.user;

  const handlePlaceBid = async () => {
    const data = {
      bidderId: user?.id,
      itemId: item.id,
      amount,
    };
    try {
      await BidDs.postData("placeBid", data);
      toast.success("Bid Placed Successfully");
      handleBidClose();
      setAmount(0);
      setTimeout(() => {
        router.reload();
      }, 3000);
    } catch (error) {
      toast.error("Error Placing Bid");
    }
  };
  const handlePurchaseNow = async () => {
    function randStr(len: any, chars = "abc123") {
      let s = "";
      while (len--) s += chars[Math.floor(Math.random() * chars.length)];
      return s;
    }
    try {
      const data = {
        itemId: item.id,
        amount: item.price,
        transactionId: randStr(20),
        purchaserId: user?.id,
      };
      await BidDs.postData("purchase", data);
      setOpenSuccessDialog(true);
      handlePurchaseClose();
      router.reload();
    } catch (error) {
      toast.error("purchasing Bid");
    }
  };

  const itemUserBid = user?.bids?.filter((x) => x.itemId === item.id);
  return (
    <>
      {openPlaceBidDialog && (
        <PlaceBidDialog
          open={openPlaceBidDialog}
          handleClose={handleBidClose}
          setAmount={setAmount}
          amount={amount}
          handlePlaceBid={handlePlaceBid}
        />
      )}
      {openPurchaseDialog && (
        <PurchaseDialog
          open={openPurchaseDialog}
          handleClose={handlePurchaseClose}
          amount={amount}
          item={item}
          handlePurchaseNow={handlePurchaseNow}
        />
      )}
      {openSucceesDialog && (
        <SuccessDialog
          open={openSucceesDialog}
          handleClose={handleSuccessClose}
        />
      )}
      <div className={styles.placebid}>
        <section className={styles.top}>
          <Avatar
            src={`/assets/auctionAvatar.png`}
            alt="creator-photo"
            sx={{ width: 50, height: 50 }}
          />
          <div>
            {itemUserBid?.length && (
              <h2 className={styles.userbid}>Your Bids</h2>
            )}
            {itemUserBid?.map((bid, index) => {
              return (
                <>
                  <h5>
                    <span>{index + 1} - </span>
                    {bid.amount} ETH{" "}
                  </h5>
                </>
              );
            })}
            {!itemUserBid?.length && <h5>No Bids</h5>}
          </div>
        </section>
        <section className={styles.button}>
          <button onClick={() => setOpenPurchaseDialog(true)}>
            Purchase now
          </button>
          <button onClick={() => setOpenPlaceBidDialog(true)}>
            place a bid
          </button>
        </section>
        <p>
          <strong>Service fee</strong>
          <span>2.563 ETH</span>
          <span>$4,540.62</span>
        </p>
      </div>
    </>
  );
}
