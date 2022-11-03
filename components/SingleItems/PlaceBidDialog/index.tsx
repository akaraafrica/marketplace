import { useState, useContext } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { AuthContext } from "../../../contexts/AuthContext";
import Dialog from "../../global/Dialog";
import styles from "./index.module.scss";
import { getUserName } from "../../../utils/helpers/getUserName";
import Link from "next/link";

export default function Index({
  open,
  handleClose,
  amount,
  item,
  setAmount,
  handlePlaceBid,
}: any) {
  const handleChange = (e: any) => {
    const value = Number(e.target.value);
    setAmount(value);
  };

  return (
    <>
      <Dialog open={open} handleClose={handleClose} title={"Place a bid"}>
        <main className={styles.main}>
          <p>
            You are about to purchase <strong>{item.title} </strong>
            from <strong>${getUserName(item?.owner)}</strong>
          </p>
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

          <h3>Your bid</h3>
          <div className={styles.bidinput}>
            <input
              type="number"
              value={amount || ""}
              placeholder="Enter bid"
              onChange={handleChange}
            />
            <strong>ETH</strong>
          </div>

          <section>
            <div>
              <span>Service fee</span>
              <strong>0 ETH</strong>
            </div>
            <div>
              <span>Total bid amount</span>
              <strong>{amount || 0} ETH</strong>
            </div>
          </section>
          <section className={styles.button}>
            <button className={styles.accept} onClick={handlePlaceBid}>
              Place Bid
            </button>
            <button onClick={handleClose}>Cancel</button>
          </section>
        </main>
      </Dialog>
    </>
  );
}
