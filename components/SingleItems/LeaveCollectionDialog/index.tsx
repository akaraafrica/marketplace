import Link from "next/link";
import { toast } from "react-toastify";
import { useSWRConfig } from "swr";
import collectionsDs from "../../../ds/collections.ds";
import Dialog from "../../global/Dialog/Dialog";
import styles from "./index.module.scss";

export const LeaveCollectionDialog = ({ open, handleClose, item }: any) => {
  const { mutate } = useSWRConfig();

  const handleRemoveItem = async () => {
    try {
      await collectionsDs.removeItem(item.collectionId, item.id);
      const newData = { ...item, collectionId: null };
      mutate("item" + item.id, () => newData, false);
      handleClose();
      toast.success("item successfully remmoved");
    } catch (error) {
      console.log(error);
      toast.error("error removing item");
      handleClose();
    }
  };

  return (
    <Dialog open={open} handleClose={handleClose} title={"Leave Collection"}>
      {item?.collection?.title && (
        <section className={styles.main}>
          <h4>
            Remove Item from{" "}
            <Link href={`/collection/${item.collectionId}`}>
              <a>{item.collection.title}</a>
            </Link>{" "}
            collection ?
          </h4>
          <div className={styles.btns}>
            <button onClick={handleRemoveItem} className={styles.yes}>
              Yes
            </button>
            <button onClick={handleClose}>No</button>
          </div>
        </section>
      )}
    </Dialog>
  );
};
export default LeaveCollectionDialog;
