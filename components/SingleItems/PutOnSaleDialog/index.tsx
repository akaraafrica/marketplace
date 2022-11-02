import Link from "next/link";
import { toast } from "react-toastify";
import { useSWRConfig } from "swr";
import { ItemDs } from "../../../ds";
import collectionsDs from "../../../ds/collections.ds";
import Dialog from "../../global/Dialog";
import styles from "./index.module.scss";

export const PutOnSaleDialog = ({ open, handleClose, item }: any) => {
  const { mutate } = useSWRConfig();

  const handleSale = async () => {
    console.log(item.id);

    try {
      await ItemDs.updateItem({ ...item, published: !item.published });
      mutate(["item", item.id]);
      toast.success(
        `item ${
          item.published ? "remove from sale" : "placed on sale"
        } successfully`
      );
      handleClose();
    } catch (error) {
      console.log(error);
      toast.error("error placing item on sale");
      handleClose();
    }
  };

  return (
    <Dialog open={open} handleClose={handleClose} title={" "}>
      <section className={styles.main}>
        <h4>
          {item.published ? "Remove" : "Place"} {item.title} on sale ?
        </h4>
        <div className={styles.btns}>
          <button onClick={handleSale}>Yes</button>
          <button onClick={handleClose}>No</button>
        </div>
      </section>
    </Dialog>
  );
};
export default PutOnSaleDialog;
