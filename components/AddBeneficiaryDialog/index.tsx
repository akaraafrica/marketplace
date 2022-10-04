import React, { useState } from "react";
import { CollectionDs } from "../../ds";
import Dialog from "../global/Dialog";
import styles from "./styles.module.scss";
import dynamic from "next/dynamic";
const ReactQuill: any = dynamic(() => import("react-quill"), { ssr: false });
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],
  [{ header: 1 }, { header: 2 }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ direction: "rtl" }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: ["#353945"] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],
  ["clean"],
];

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
              placeholder="John Doe"
            />
          </div>
          <div className={styles.inputDiv}>
            <label>Wallet Address</label>
            <input
              onChange={(e) => setWallet(e.target.value)}
              type="text"
              placeholder="0x00000000000..."
            />
          </div>
          <div className={styles.inputDiv}>
            <label>Description</label>
            {/* <input
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              placeholder="Enter beneficiary description"
            /> */}
            <ReactQuill
              modules={{
                toolbar: toolbarOptions,
              }}
              theme="snow"
              style={{
                height: "10rem",
                marginBottom: "100px",
              }}
              placeholder='e.g. “Funds will be sent to beneficiary...”"'
              value={description}
              onChange={(e: any) => {
                setDescription(e);
              }}
            />
          </div>
          <div className={styles.inputDiv}>
            <label>Percentage</label>
            <input
              onChange={(e) => setPercent(parseInt(e.target.value))}
              type="number"
              placeholder="10%"
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </main>
    </Dialog>
  );
};

export default Index;
