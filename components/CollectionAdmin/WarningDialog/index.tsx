import Dialog from "../../global/Dialog/Dialog";
import styles from "./index.module.scss";

export default function WarningDialog({
  open,
  handleClose,
  handleContinue,
}: any) {
  return (
    <>
      <Dialog open={open} handleClose={handleClose}>
        <main className={styles.main}>
          <h4>Warning!</h4>

          <h6>
            Making changes to a collection already verified by contributors will
            push it back to draft and another request will have to be sent to
            contributors to approve of the changes.
          </h6>

          <section className={styles.button}>
            <button className={styles.accept} onClick={handleContinue}>
              Continue
            </button>
            <button onClick={handleClose}>Cancel</button>
          </section>
        </main>
      </Dialog>
    </>
  );
}
