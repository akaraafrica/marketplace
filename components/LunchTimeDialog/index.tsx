import { useState } from "react";
import { toast } from "react-toastify";
import collectionsDs from "../../ds/collections.ds";
import Dialog from "../global/Dialog";
import styles from "./index.module.scss";

export default function LunchTimeDialog({
  open,
  handleClose,
  collectionId,
}: any) {
  const handleLunchTime = async () => {
    if (date) {
      try {
        await collectionsDs.updateLunchTime({ id: collectionId, date });
        handleClose();
        toast.success("collection lunch time updated");
      } catch (error) {
        console.log(error);
        toast.error("error updating collection");
      }
    }
  };
  const [date, setDate] = useState<null | string>(null);
  return (
    <>
      <Dialog open={open} handleClose={handleClose}>
        <main className={styles.main}>
          <h4>Edit collection Lunch Time</h4>
          <p>When would you like your new collection to drop?</p>
          <input
            onChange={(e) => setDate(e.target.value)}
            type="datetime-local"
            value={date!}
          />
          <section className={styles.button}>
            <button className={styles.accept} onClick={handleLunchTime}>
              save
            </button>
            <button onClick={handleClose} disabled={!date}>
              Cancel
            </button>
          </section>
        </main>
      </Dialog>
    </>
  );
}
