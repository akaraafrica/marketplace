import Image from "next/image";
import { getUserName } from "../../../utils/helpers/getUserName";
import Dialog from "../../global/Dialog";
import styles from "./index.module.scss";

export const SuccessDialog = ({ open, handleClose, item }: any) => {
  setTimeout(() => {
    handleClose();
  }, 5000);

  return (
    <Dialog open={open} handleClose={handleClose} title={" "}>
      <div className={styles.success}>
        <h2>Yay! 🎉</h2>
        <p>
          You successfully purchased <span>{item.title}</span> from{" "}
          {getUserName(item.owner)}
        </p>

        <section>
          <div className={styles.status}>
            <span>Status</span>
            <span>Transaction ID</span>
          </div>
          <div>
            <span className={styles.processing}>Processing</span>
            <span>0msx836930...87r398</span>
          </div>
        </section>
        <div className={styles.time}>
          <p>Time to show-off</p>
        </div>
        <div className={styles.social}>
          <Image
            alt="facebook"
            src={`/assets/singleItem/facebook.svg`}
            width={45}
            height={45}
          />
          <Image
            alt="twitter"
            src={`/assets/singleItem/twitter.svg`}
            width={45}
            height={45}
          />
          <Image
            alt="instagram"
            src={`/assets/singleItem/instagram.svg`}
            width={45}
            height={45}
          />
          <Image
            alt="pinterest"
            src={`/assets/singleItem/pinterest.svg`}
            width={45}
            height={45}
          />
        </div>
      </div>
    </Dialog>
  );
};
export default SuccessDialog;
