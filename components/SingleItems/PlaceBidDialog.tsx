import Image from "next/image";
import { useState } from "react";
import Dialog from "../global/Dialog";
import styles from "./PlaceBidDialog.module.scss";

export default function PlaceBidDialog({
  open,
  handleClose,
  amount,
  item,
  setAmount,
  handlePlaceBid,
}: any) {
  const [followSteps, setFollowSteps] = useState(false);
  const balanceValue = 10;
  const [balance, setBalance] = useState(balanceValue);
  const handleChange = (e: any) => {
    const value = Number(e.target.value);
    setAmount(value);
    setBalance(balanceValue - value);
  };
  console.log(item);

  return (
    <>
      <Dialog
        open={open}
        handleClose={handleClose}
        title={!followSteps ? "Place a bid" : "Follow steps"}
      >
        {!followSteps ? (
          <main className={styles.main}>
            <p>
              You are about to purchase <strong>{item.title} </strong>
              from <strong> {item?.owner?.walletAddress?.slice(0, 6)}</strong>
            </p>

            <h3>Your bid</h3>
            <div className={styles.bidinput}>
              <input
                type="number"
                value={amount}
                placeholder="Enter bid"
                onChange={handleChange}
              />
              <strong>ETH</strong>
            </div>

            <section>
              <div>
                <span>Your balance </span>
                <strong>{balance} ETH</strong>
              </div>
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
              <button
                className={styles.accept}
                disabled={amount <= 0 || balance < 0}
                onClick={() => setFollowSteps(true)}
              >
                Place Bid
              </button>
              <button onClick={handleClose}>Cancel</button>
            </section>
          </main>
        ) : (
          <Steps handlePlaceBid={handlePlaceBid} />
        )}
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
          <Image
            alt="deposit"
            src={`/assets/singleItem/${img}`}
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
              alt="approve"
              src="/assets/singleItem/spinner.svg"
              width={20}
              height={20}
            />
          ) : (
            "Start now"
          )}
        </span>
      </button>
    </section>
  );
};
export const Steps = ({ handlePlaceBid }: any) => {
  const [loading, setLoading] = useState({
    deposit: false,
    approve: false,
    signature: false,
  });
  const [step, setStep] = useState({
    deposit: false,
    approve: false,
    signature: false,
  });
  const [disable, setDisable] = useState({
    deposit: false,
    approve: true,
    signature: true,
  });
  const handleDeposit = () => {
    setLoading({
      ...loading,
      deposit: true,
    });
    setTimeout(() => {
      setLoading({
        ...loading,
        deposit: false,
      });
      setStep({
        ...step,
        deposit: true,
      });
      setDisable({
        ...disable,
        approve: false,
      });
    }, 2000);
  };
  const handleApprove = () => {
    setLoading({
      ...loading,
      approve: true,
    });
    setTimeout(() => {
      setLoading({
        ...loading,
        approve: false,
      });
      setStep({
        ...step,
        approve: true,
      });
      setDisable({
        ...disable,
        signature: false,
      });
    }, 2000);
  };
  const handleSignature = () => {
    setLoading({
      ...loading,
      signature: true,
    });
    setTimeout(() => {
      setLoading({
        ...loading,
        signature: false,
      });
      setStep({
        ...step,
        signature: true,
      });
      handlePlaceBid();
    }, 2000);
  };
  return (
    <div className={styles.followsteps}>
      <StepSection
        heading="Deposit ETH"
        text="Send transaction with your wallet"
        step={step.deposit}
        disabled={disable.deposit}
        img="deposit.svg"
        loading={loading.deposit}
        onClick={handleDeposit}
      />
      <StepSection
        img="approve.png"
        heading="Approve"
        text="Checking balance and approving"
        step={step.approve}
        disabled={disable.approve}
        loading={loading.approve}
        onClick={handleApprove}
      />
      <StepSection
        img="signature.png"
        heading="Signature"
        text="Create a signature to place a bid"
        step={step.signature}
        loading={loading.signature}
        disabled={disable.signature}
        onClick={handleSignature}
      />
    </div>
  );
};
