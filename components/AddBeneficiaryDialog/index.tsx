import React, { useEffect, useState } from "react";
import { CollectionDs } from "../../ds";
import Dialog from "../global/Dialog";
import styles from "./styles.module.scss";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
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
  mutate: any;
  beneficiary: any;
  setBeneficiary: any;
}
const Index: React.FC<Properties> = ({
  open,
  handleClose,
  collectionId,
  mutate,
  beneficiary,
  setBeneficiary,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [wallet, setWallet] = useState("");
  const [description, setDescription] = useState("");
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    if (beneficiary) {
      setName(beneficiary.name);
      setEmail(beneficiary.email);
      setWallet(beneficiary.walletAddress);
      setDescription(beneficiary.description);
      setPercent(beneficiary.percentage);
    }
  }, [beneficiary]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!name || !email || !wallet || !description || !percent) {
      return;
    }
    const data = {
      name: name,
      email: email,
      walletAddress: wallet,
      description: description,
      percentage: percent,
    };
    if (beneficiary) {
      const data = {
        id: beneficiary.id,
        name: name,
        email: email,
        walletAddress: wallet,
        description: description,
        percentage: percent,
      };
      try {
        await CollectionDs.updateBeneficiary(collectionId, data);
        setName("");
        setEmail("");
        setWallet("");
        setDescription("");
        setPercent(0);
        toast.success("Beneficiary successful updated");
        mutate();
        setBeneficiary(null);
        handleClose();
      } catch (error) {
        toast.success("Error updating beneficiary");
        console.log(error);
      }
    } else {
      try {
        await CollectionDs.addBeneficiary(collectionId, data);
        setName("");
        setEmail("");
        setWallet("");
        setDescription("");
        setPercent(0);
        toast.success("Beneficiary successful added");
        mutate();
        setBeneficiary(null);
        handleClose();
      } catch (error) {
        toast.success("Error adding beneficiary");
        console.log(error);
      }
    }
  };
  const handleDialogClose = () => {
    setName("");
    setEmail("");
    setWallet("");
    setDescription("");
    setPercent(0);
    setBeneficiary(null);
    handleClose();
  };
  return (
    <Dialog open={open} handleClose={handleDialogClose}>
      <main className={styles.main}>
        <h4>{beneficiary ? "Edit" : "Add"} Beneficiary</h4>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputDiv}>
            <label>Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              required
              placeholder="John doe"
            />
          </div>
          <div className={styles.inputDiv}>
            <label>Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              value={email}
              placeholder="example@gmail.com"
            />
          </div>
          <div className={styles.inputDiv}>
            <label>Wallet Address</label>
            <input
              onChange={(e) => setWallet(e.target.value)}
              type="text"
              required
              value={wallet}
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
              max={100}
              required
              value={percent}
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
