import React from "react";
import styles from "./index.module.scss";
import Dialog from "../../global/Dialog/Dialog";
import collectionsDs from "../../../ds/collections.ds";
import { toast } from "react-toastify";
import { ICollection } from "../../../types/collection.interface";

interface Properties {
  open: boolean;
  handleClose: () => void;
  collection: ICollection;
  mutate: any;
}
const Index: React.FC<Properties> = ({
  open,
  handleClose,
  collection,
  mutate,
}) => {
  const handleChangeStatusToVerified = async () => {
    try {
      await collectionsDs.updateStatus({
        id: collection.id,
        status: "VERIFIED",
        collection,
      });
      toast.success("Collection status updated, ready to publish");
      handleClose();
      mutate();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog open={open} handleClose={handleClose}>
      <main className={styles.root}>
        <h2>All Contributors have agreed to be part of the collection 🎉</h2>
        <p>Would you like to proceed to the next stage?</p>
        <div className={styles.btns}>
          <button onClick={handleClose}>No</button>
          <button onClick={handleChangeStatusToVerified}>Yes</button>
        </div>
      </main>
    </Dialog>
  );
};

export default Index;
