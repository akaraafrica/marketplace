import Image from "next/image";
import { useState } from "react";
import Dialog from "../global/Dialog";
import styles from "./MintTokenDialog.module.scss";

export default function PlaceBidDialog({ open, handleClose, handleMint }: any) {
  return (
    <>
      <Dialog open={open} handleClose={handleClose} title={"Follow steps"}>
        <Steps handleMint={handleMint} handleClose={handleClose} />
      </Dialog>
    </>
  );
}

export const StepSection = ({
  heading,
  text,
  img,
  step,
  loading,
  onClick,
  disabled,
}: any) => {
  return (
    <section>
      <div className={styles.top}>
        {step ? (
          <Image
            alt="deposit"
            src="/assets/singleItem/approvegreen.svg"
            width={40}
            height={40}
          />
        ) : (
          <Image alt="deposit" src={`/assets/${img}`} width={40} height={40} />
        )}{" "}
        <div>
          <h4>{heading}</h4>
          <p>{text}</p>
        </div>
      </div>
      <button
        onClick={onClick}
        disabled={disabled}
        className={loading ? styles.loading : ""}
      >
        <span>
          {loading ? (
            <Image
              alt="spinner"
              src="/assets/singleItem/spinner.svg"
              width={20}
              height={20}
            />
          ) : step ? (
            "Done"
          ) : (
            "Start now"
          )}
        </span>
      </button>
    </section>
  );
};
export const Steps = ({ handleMint, handleClose }: any) => {
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [sign, setSign] = useState(false);
  const [disable, setDisable] = useState(false);

  const [terms, setTerms] = useState(false);
  const handleSign = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDisable(true);
      setSign(true);
    }, 5000);
  };

  const handleTerms = () => setTerms(!terms);

  const handleSubmit = async () => {
    setSubmitLoading(true);
    await handleMint();
    setTimeout(() => {
      handleClose();
      setSubmitLoading(false);
    }, 3000);
  };
  return (
    <div className={styles.followsteps}>
      <StepSection
        heading="Upload files & Mint token"
        text="Call contract method"
        step={true}
        disabled={true}
        img=""
        loading={false}
        onClick={null}
      />
      <StepSection
        img="sign.svg"
        heading="Sign sell order"
        text="Sign sell order using your wallet"
        step={sign}
        disabled={disable}
        loading={loading}
        onClick={handleSign}
      />
      <section className={styles.terms}>
        <input type="checkbox" onChange={handleTerms} />
        <span>Agree terms and condition</span>
      </section>
      <button
        onClick={handleSubmit}
        className={submitLoading ? styles.loading : ""}
        disabled={!terms || !sign || submitLoading}
      >
        {submitLoading ? (
          <Image
            alt="spinner"
            src="/assets/singleItem/spinner.svg"
            width={20}
            height={20}
          />
        ) : (
          "submit"
        )}
      </button>
    </div>
  );
};
