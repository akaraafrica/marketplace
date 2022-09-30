import React, { useState } from "react";
import { CollectionDs } from "../../ds";
import Dialog from "../global/Dialog";
import styles from "./styles.module.scss";

interface Properties {
  open: boolean;
  handleClose: () => void;
  collectionId: number;
}
const Index: React.FC<Properties> = ({ open, handleClose, collectionId }) => {
  const [name, setName] = useState("");
  const [wallet, setWallet] = useState("");
  const [description, setDescription] = useState("");
  const [percent, setPercent] = useState(0);

  const handleSubmit = async () => {
    if (!name || !wallet || !description || !percent) {
      return;
    }
    const data = {
      name: name,
      walletAddress: wallet,
      description: description,
      percentage: percent,
    };
    await CollectionDs.addBeneficiary(collectionId, data);
  };
  return (
    <Dialog open={open} handleClose={handleClose}>
      <main className={styles.main}>
        <h4>Add Beneficiary</h4>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputDiv}>
            <label>Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter beneficiary name"
            />
          </div>
          <div className={styles.inputDiv}>
            <label>Wallet Address</label>
            <input
              onChange={(e) => setWallet(e.target.value)}
              type="text"
              placeholder="Enter beneficiary wallet"
            />
          </div>
          <div className={styles.inputDiv}>
            <label>Description</label>
            <input
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              placeholder="Enter beneficiary description"
            />
          </div>
          <div className={styles.inputDiv}>
            <label>Percentage</label>
            <input
              onChange={(e) => setPercent(parseInt(e.target.value))}
              type="number"
              placeholder="Enter beneficiary percentage"
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </main>
    </Dialog>
  );
};

export default Index;
