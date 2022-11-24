import { CircularProgress } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import Dialog from "../../global/Dialog/Dialog";
import styles from "./index.module.scss";
import { getUserName } from "../../../utils/helpers/getUserName";

export default function AcceptBidDialog({
  open,
  handleClose,
  item,
  handleAcceptBid,
  selectedBid,
}: any) {
  const [followSteps, setFollowSteps] = useState(false);

  const handleAccept = () => {
    setFollowSteps(true);
    setTimeout(() => {
      //TODO-OnChain-action
      handleAcceptBid();
    }, 3000);
  };
  return (
    <>
      <Dialog
        open={open}
        handleClose={handleClose}
        title={!followSteps ? "Checkout" : "Follow steps"}
      >
        {!followSteps ? (
          <main className={styles.main}>
            <div className={styles.heading}>
              <Image
                alt="deposit"
                src="/assets/singleItem/approvegreen.svg"
                width={50}
                height={50}
              />
              <p>
                You are about to accept bid from{" "}
                <strong> ${getUserName(selectedBid?.user)}</strong> for
                <strong> {item.title} </strong>
              </p>
            </div>
            <div className={styles.price}>
              <strong>{selectedBid.amount} ETH</strong>
            </div>

            <section>
              <div>
                <span>Service fee</span>
                <strong>0 ETH</strong>
              </div>
              <div>
                <span>Total bid amount</span>
                <strong>{item.price} ETH</strong>
              </div>
            </section>

            <section className={styles.button}>
              <button className={styles.accept} onClick={handleAccept}>
                Accept bid
              </button>
              <button onClick={handleClose}>Cancel</button>
            </section>
          </main>
        ) : (
          <div className={styles.followsteps}>
            <section>
              <div className={styles.top}>
                <CircularProgress color="success" size={40} thickness={8} />
                <div>
                  <h4>Accept bid</h4>
                  <p>send transaction with your wallet</p>
                </div>
              </div>
            </section>
          </div>
        )}
      </Dialog>
    </>
  );
}
