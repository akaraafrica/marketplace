import { CircularProgress } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { getUserName } from "../../utils/helpers/getUserName";
import Dialog from "../global/Dialog";
import styles from "./AcceptBidDialog.module.scss";

export default function AcceptBidDialog({
  open,
  handleClose,
  item,
  handleAcceptBid,
}: any) {
  const [followSteps, setFollowSteps] = useState(false);

  const handleAccept = () => {
    setFollowSteps(true);
    setTimeout(() => {
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
                You are about to purchase <strong>{item.title} </strong>
                from <strong> ${getUserName(item?.owner)}</strong>
              </p>
            </div>
            <div className={styles.price}>
              <strong>{item.price} ETH</strong>
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
