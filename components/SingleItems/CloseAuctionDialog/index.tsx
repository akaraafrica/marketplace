import Link from "next/link";
import { toast } from "react-toastify";
import { useSWRConfig } from "swr";
import { AuctionDs } from "../../../ds";
import Dialog from "../../global/Dialog";
import styles from "./index.module.scss";

export const CloseAuctionDialog = ({ open, handleClose, item }: any) => {
  const { mutate } = useSWRConfig();
  const handleDelete = async () => {
    try {
      const newData = { ...item, auction: { open: false } };
      mutate("item" + item.id, () => newData, false);
      handleClose();
      toast.success("Auction deleted");
      await AuctionDs.deleteData({
        id: item.auction.id,
      });
      mutate("item" + item.id);
    } catch (error) {
      toast.error("Error deleting auction");
    }
  };

  return (
    <Dialog open={open} handleClose={handleClose} title={" "}>
      <section className={styles.main}>
        <h4>Remove {item.title} from auction ?</h4>
        <div className={styles.btns}>
          <button onClick={handleDelete}>Yes</button>
          <button onClick={handleClose} className={styles.no}>
            No
          </button>
        </div>
      </section>
    </Dialog>
  );
};
export default CloseAuctionDialog;
