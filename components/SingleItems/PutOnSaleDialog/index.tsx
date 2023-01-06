import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { useSWRConfig } from "swr";
import { ItemDs } from "../../../ds";
import collectionsDs from "../../../ds/collections.ds";
import Dialog from "../../global/Dialog/Dialog";
import styles from "./index.module.scss";

export const PutOnSaleDialog = ({ open, handleClose, item }: any) => {
  const { mutate } = useSWRConfig();

  const handleSale = async () => {
    try {
      const newData = {
        ...item,
        published: false,
      };
      mutate("item" + item.id, () => newData, false);

      handleClose();
      toast.success(
        `item ${
          item.published ? "Removed from sale" : "Placed on sale"
        } successfully`
      );
      await ItemDs.updateItem({ ...item, published: !item.published });
      mutate("item" + item.id);
    } catch (error) {
      console.log(error);
      toast.error("error placing item on sale");
      handleClose();
    }
  };

  return (
    <Dialog open={open} handleClose={handleClose} title={" "}>
      {item.step > 4 && (
        <section className={styles.main}>
          <h4>
            {item.published ? "Remove" : "Place"} {item.title} on sale ?
          </h4>
          <div className={styles.btns}>
            <button onClick={handleSale}>Yes</button>
            <button onClick={handleClose} className={styles.no}>
              No
            </button>
          </div>
        </section>
      )}{" "}
      {item.step < 4 && (
        <section className={styles.notverified}>
          <Image
            alt="deposit"
            src={`/assets/singleItem/alert.svg`}
            width={50}
            height={50}
          />
          <h4>Complete minting item</h4>
        </section>
      )}
    </Dialog>
  );
};
export default PutOnSaleDialog;
