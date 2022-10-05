import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../../../contexts/AuthContext";
import { Avatar } from "@mui/material";
import { BidDs } from "../../../ds";
import styles from "./index.module.scss";
import { toast } from "react-toastify";
import PlaceBidDialog from "../PlaceBidDialog";
import PurchaseDialog from "../PurchaseDialog";
import SuccessDialog from "../SuccessDialog";
import { IItem } from "../../../types/item.interface";

export default function PlaceBid({ item }: { item: IItem }) {
  const router = useRouter();
  const [openPlaceBidDialog, setOpenPlaceBidDialog] = useState(false);
  const [openPurchaseDialog, setOpenPurchaseDialog] = useState(false);
  const [openSucceesDialog, setOpenSuccessDialog] = useState(false);
  const [amount, setAmount] = useState<number | null>(null);
  const { user } = useContext(AuthContext);

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
      toast.success("Bid Placed Successfully");
      handleBidClose();
      setAmount(null);
      setTimeout(() => {
        router.reload();
      }, 2000);
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
      setOpenSuccessDialog(true);
      handlePurchaseClose();
      router.reload();
    } catch (error) {
      toast.error("purchasing Bid");
    }
  };

  const itemUserBid = item?.bids?.filter((x) => x.bidderId === user?.id);

  return (
    <>
      {openPlaceBidDialog && (
        <PlaceBidDialog
          open={openPlaceBidDialog}
          handleClose={handleBidClose}
          setAmount={setAmount}
          item={item}
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
          item={item}
        />
      )}
      <div className={styles.placebid}>
        {item?.auction?.open && (
          <section className={styles.top}>
            {itemUserBid?.length > 0 && (
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
            )}
          </section>
        )}

        <section className={styles.button}>
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
          )}{" "}
        </section>
        {/* <p>
          <strong>Service fee</strong>
          <span>{item?.price} ETH</span>
          <span>$4,540.62</span>
        </p> */}
      </div>
    </>
  );
}
