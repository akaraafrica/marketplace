import React from "react";
import styles from "./index.module.scss";
import Dialog from "../global/Dialog";
import collectionsDs from "../../ds/collections.ds";
import { toast } from "react-toastify";

interface Properties {
  open: boolean;
  handleClose: () => void;
  collectionId: number;
  mutate: any;
}
const Index: React.FC<Properties> = ({
  open,
  handleClose,
  collectionId,
  mutate,
}) => {
  const handleChangeStatusToVerified = async () => {
    try {
      await collectionsDs.updateStatus({
        id: collectionId,
        status: "VERIFIED",
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
