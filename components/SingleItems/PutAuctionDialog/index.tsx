import Dialog from "../../global/Dialog/Dialog";
import styles from "./index.module.scss";

export const CloseAuctionDialog = ({
  open,
  handleClose,
  item,
  setOpen,
}: any) => {
  const handleContinue = async () => {
    setOpen(true);
    handleClose();
  };

  return (
    <Dialog
      open={open}
      handleClose={handleClose}
      title={`Put ${item.title} on auction ?`}
    >
      <section className={styles.main}>
        <h4>NOTE !!!</h4> <h5> Auction Date cannot not changed once set.</h5>
        <h5>Item Owner will be automatically be set to hightest bidder.</h5>
        <div className={styles.btns}>
          <button onClick={handleContinue}>Continue</button>
          <button onClick={handleClose} className={styles.no}>
            No
          </button>
        </div>
      </section>
    </Dialog>
  );
};
export default CloseAuctionDialog;
