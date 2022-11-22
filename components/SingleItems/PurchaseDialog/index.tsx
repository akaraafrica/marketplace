import { CircularProgress } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import collectionsDs from "../../../ds/collections.ds";
import { getUserName } from "../../../utils/helpers/getUserName";
import Dialog from "../../global/Dialog/Dialog";
import styles from "./index.module.scss";

export default function PurchaseDialog({
  open,
  handleClose,
  item,
  handlePurchaseNow,
}: any) {
  const isVerified = item.owner.verified;
  const [followSteps, setFollowSteps] = useState(false);
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
                You are about to purchase <strong>{item.title} </strong>
                from <strong>${getUserName(item?.owner)}</strong> for
                <strong> {item.price} ETH</strong>
              </p>
            </div>
            <div className={styles.price}></div>
            {item.collectionId && (
              <section className={styles.collectionItem}>
                <div>
                  <h4>
                    {item.title} is part of{" "}
                    <Link href={`/collection/${item.collectionId}`}>
                      <a>{item.collection.title}</a>
                    </Link>{" "}
                    collection
                  </h4>
                </div>
              </section>
            )}

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
              <button className={styles.accept} onClick={handlePurchase}>
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
            </section>
          </div>
        )}
      </Dialog>
    </>
  );
}
