import { useState } from "react";
import { toast } from "react-toastify";
import collectionsDs from "../../ds/collections.ds";
import Dialog from "../global/Dialog";
import styles from "./index.module.scss";

export default function PayoutDialog({ open, handleClose, collection }: any) {
  const balance = 50;
  const handlePayout = async () => {
    if (amount) {
      try {
        // await collectionsDs.payout({ collection });
        handleClose();
        toast.success("collection lunch time updated");
      } catch (error) {
        console.log(error);
        toast.error("error updating collection");
      }
    }
  };
  const [amount, setAmount] = useState<null | string>(null);

  return (
    <>
      <Dialog open={open} handleClose={handleClose}>
        <main className={styles.main}>
          <h4>Payout Funds</h4>
          <p>
            THis action will widthdraw funds from the collection and send it to
            your wallet address
          </p>
          <h6>Balance: {balance} ETH</h6>
          <input
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            placeholder="Widthdral amount"
            value={amount!}
          />
          <section className={styles.button}>
            <button className={styles.accept} onClick={handlePayout}>
              widthdraw
            </button>
            <button onClick={handleClose} disabled={!amount}>
              Cancel
            </button>
          </section>
        </main>
      </Dialog>
    </>
  );
}
