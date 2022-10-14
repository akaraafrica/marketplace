import { useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../../contexts/AuthContext";
import { CollectionDs } from "../../../ds";
import Dialog from "../../global/Dialog";
import styles from "./index.module.scss";

export default function VerifyDialog({
  open,
  handleClose,
  collection,
  mutate,
}: any) {
  const user = useContext(AuthContext).user;

  const handleSendRequest = async () => {
    try {
      await CollectionDs.sendRequestToContributors({ collection, user });
      mutate();
      handleClose();
      toast.success("request sent successfully");
    } catch (error) {
      console.log(error);
      toast.success("error sending request");
    }
  };
  return (
    <>
      <Dialog open={open} handleClose={handleClose}>
        <main className={styles.main}>
          <h4>You are about to send request to contributors.</h4>

          <h6>
            Are you Sure want to procced? You can&#39;t send another request
            after this.
          </h6>

          <section className={styles.button}>
            <button className={styles.accept} onClick={handleSendRequest}>
              Send Request
            </button>
            <button onClick={handleClose}>Cancel</button>
          </section>
        </main>
      </Dialog>
    </>
  );
}
