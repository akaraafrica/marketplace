import { CircularProgress } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import Dialog from "../global/Dialog";
import styles from "./PurchaseDialog.module.scss";

export default function PurchaseDialog({
  open,
  handleClose,
  item,
  handlePurchaseNow,
}: any) {
  const isVerified = item.owner.verified;
  const [followSteps, setFollowSteps] = useState(false);
  const balance = 10;

  const handlePurchase = () => {
    setFollowSteps(true);
    setTimeout(() => {
      handlePurchaseNow();
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
            <div>
              <p>
                You are about to purchase <strong>COINZ </strong>
                from <strong>Ul8</strong>
              </p>
            </div>
            <div className={styles.price}>
              <strong>{item.price}</strong>
              <strong>ETH</strong>
            </div>

            <section>
              <div>
                <span>Your balance </span>
                <strong>{balance} ETH</strong>
              </div>
              <div>
                <span>Service fee</span>
                <strong>0 ETH</strong>
              </div>
              <div>
                <span>You will pay</span>
                <strong>{item.price} ETH</strong>
              </div>
            </section>
            {!isVerified && (
              <section className={styles.notverified}>
                <Image
                  alt="deposit"
                  src={`/assets/singleItem/alert.svg`}
                  width={50}
                  height={50}
                />
                <div>
                  <h4>This creator is not verified</h4>
                  <p>Purchase this item at your own risk</p>
                </div>
              </section>
            )}

            <section className={styles.button}>
              <button
                className={styles.accept}
                disabled={balance < item.price}
                onClick={handlePurchase}
              >
                I understand, continue
              </button>
              <button onClick={handleClose}>Cancel</button>
            </section>
          </main>
        ) : (
          <div className={styles.followsteps}>
            <section>
              <div className={styles.top}>
                <CircularProgress
                  variant="indeterminate"
                  size={40}
                  thickness={4}
                />
                <div>
                  <h4>Purchasing</h4>
                  <p>Sending transaction with your wallet</p>
                </div>
              </div>
              {!isVerified && (
                <section className={styles.notverified}>
                  <Image
                    alt="deposit"
                    src={`/assets/singleItem/alert.svg`}
                    width={50}
                    height={50}
                  />
                  <div>
                    <h4>This creator is not verified</h4>
                    <p>Purchase this item at your own risk</p>
                  </div>
                </section>
              )}

              <button>I understand, continue</button>
            </section>
          </div>
        )}
      </Dialog>
    </>
  );
}
