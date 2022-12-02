import Image from "../global/Image";
import { useState, useContext } from "react";

import Dialog from "../global/Dialog/Dialog";
import styles from "./MintTokenDialog.module.scss";

export interface Step {
  count: number;
  loading: boolean;
  complete: boolean;
}
interface properties {
  open: boolean;
  handleMint: Function;
  handleUpload: Function;
  handleClose: Function;
  handleSignOrder: Function;
  step: Step;
  handleSubmit: Function;
}

export default function MinkTokenDialog({
  open,
  handleClose,
  handleMint,
  handleUpload,
  handleSignOrder,
  step,
  handleSubmit,
}: properties) {
  return (
    <>
      <Dialog open={open} handleClose={handleClose} title={"Follow steps"}>
        <Steps
          handleClose={handleClose}
          handleMint={handleMint}
          handleUpload={handleUpload}
          handleSignOrder={handleSignOrder}
          step={step}
          handleSubmit={handleSubmit}
        />
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
          <Image alt="deposit" src={`/assets/${img}`} width={40} height={40} />
        ) : (
          <Image
            alt="deposit"
            src="/assets/singleItem/approvegreen.svg"
            width={40}
            height={40}
          />
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
            "Start now"
          ) : (
            "Done"
          )}
        </span>
      </button>
    </section>
  );
};

export const Steps = ({
  handleUpload,
  handleMint,
  handleSignOrder,
  step,
  handleSubmit,
}: any) => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [terms, setTerms] = useState(false);

  const handleTerms = () => setTerms(!terms);

  return (
    <div className={styles.followsteps}>
      <StepSection
        heading="Upload files"
        text="files uploaded"
        img={step.count > 1 ? "" : "upload.svg"}
        step={step.count <= 1}
        disabled={step.count != 1}
        loading={step.count == 1 && step.loading}
        onClick={handleUpload}
      />
      <StepSection
        heading="Mint token"
        text="Call contract method"
        img={step.count > 2 ? "" : "mint.svg"}
        step={step.count <= 2}
        disabled={step.count != 2}
        loading={step.count == 2 && step.loading}
        onClick={handleMint}
      />
      <StepSection
        heading="Sign sell order"
        text="Sign sell order using your wallet"
        img={step.count > 3 ? "" : "sign.svg"}
        step={step.count <= 3}
        disabled={step.count != 3}
        loading={step.count == 3 && step.loading}
        onClick={handleSignOrder}
      />
      <section className={styles.terms}>
        <input type="checkbox" onChange={handleTerms} />
        <span>Agree terms and condition</span>
      </section>
      <button
        onClick={handleSubmit}
        className={submitLoading ? styles.loading : ""}
        disabled={!terms || step.count < 3 || submitLoading}
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
