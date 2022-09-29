import Image from "../../components/Image";
import { useState } from "react";

import Dialog from "../global/Dialog";
import styles from "./MintCollectionDialog.module.scss";
import { toast } from "react-toastify";
import { useContract } from "../../hooks/web3";
import { useWeb3React } from "@web3-react/core";
import {
  CHAIN_TO_NFT_ADDRESS,
  CHAIN_TO_MARKETPLACE_ADDRESS,
  SupportedChainId,
} from "../../constants";
import token from "../../artifacts/nft.json";
import { ICollection } from "../../types/collection.interface";

export interface Step {
  count: number;
  loading: boolean;
  complete: boolean;
}

interface properties {
  open: boolean;
  handleClose: Function;
  collection: ICollection;
}

export default function MintCollectionDialog({
  open,
  handleClose,
  collection,
}: properties) {
  const [step, setStep] = useState<Step>({
    count: 1,
    loading: false,
    complete: false,
  });
  const { chainId } = useWeb3React();
  const tokenContract = useContract(
    CHAIN_TO_NFT_ADDRESS[chainId as SupportedChainId],
    token
  );
  const marketplaceContract = useContract(
    CHAIN_TO_MARKETPLACE_ADDRESS[chainId as SupportedChainId],
    token
  );
  const handleCreate = async () => {
    console.log("handleMint");
    setStep({ ...step, loading: true });
    setTimeout(() => {
      setStep({ ...step, loading: false, count: 2 });
    }, 3000);
  };

  const handleContributors = async () => {
    console.log("handleMint");
    setStep({ ...step, loading: true });
    setTimeout(() => {
      setStep({ ...step, loading: false, count: 3 });
    }, 3000);
  };
  const handleSignOrder = async () => {
    console.log("handleSignSellOrder");
    setStep({ ...step, loading: true });
    setTimeout(() => {
      setStep({ ...step, loading: false, count: 4 });
    }, 3000);
  };
  const handleSubmit = async () => {
    setStep({ ...step, complete: true });
    handleClose();
    toast.success("successful");
  };
  return (
    <>
      <Dialog open={open} handleClose={handleClose} title={"Follow steps"}>
        <Steps
          handleClose={handleClose}
          handleCreate={handleCreate}
          handleContributors={handleContributors}
          handleSignOrder={handleSignOrder}
          step={step}
          handleSubmit={handleSubmit}
        />
      </Dialog>
    </>
  );
}

export const Steps = ({
  handleCreate,
  handleSignOrder,
  handleContributors,
  step,
  handleSubmit,
}: any) => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [terms, setTerms] = useState(false);

  const handleTerms = () => setTerms(!terms);

  return (
    <div className={styles.followsteps}>
      <StepSection
        heading="Create Collection"
        text="create collection"
        img={step.count > 1 ? "" : "upload.svg"}
        step={step.count <= 1}
        disabled={step.count != 1}
        loading={step.count == 1 && step.loading}
        onClick={handleCreate}
      />
      <StepSection
        heading="Setup Contributors"
        text="setup contributors"
        img={step.count > 2 ? "" : "mint.svg"}
        step={step.count <= 2}
        disabled={step.count != 2}
        loading={step.count == 2 && step.loading}
        onClick={handleContributors}
      />
      <StepSection
        heading="Sign Sell Order"
        text="sign sell order using your wallet"
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
