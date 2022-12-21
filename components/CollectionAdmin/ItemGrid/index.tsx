import Link from "next/link";
import { toast } from "react-toastify";
import collectionsDs from "../../../ds/collections.ds";
import { ICollection } from "../../../types/collection.interface";
import { IUser } from "../../../types/user.interface";
import NextImage from "../../global/Image";
import styles from "./index.module.scss";

export default function ItemGrid({
  title,
  collection,
  user,
  view,
}: {
  user: IUser;
  collection: ICollection;
  title: string;
  view?: boolean;
}) {
  const handleRemoveItem = async (item: any) => {
    try {
      await collectionsDs.removeItem(item.collectionId, item.id, "draft");
      toast.success("item successfully removed");
    } catch (error) {
      console.log(error);
      toast.error("error removing item");
    }
  };
  return (
    <section className={styles.watchlist}>
      <h3>{title}</h3>
      <div className={styles.center}>
        {collection.items.map((item: any) => {
          return (
            <>
              <div className={styles.cards} key={item.id}>
                <Link key={item.id} href={`/item/${item.id}`}>
                  <NextImage
                    className={styles.cardImg}
                    src={
                      item?.images
                        ? item?.images[0]
                        : `/assets/placeholder-image.jpg`
                    }
                    width="250px"
                    height="250px"
                    alt="product"
                  />
                </Link>
                <div className={styles.cardDetails}>
                  <span className={styles.cardName}>{item?.title}</span>
                  <div className={styles.previewcardprice}>
                    <span>{item?.price} ETH</span>
                  </div>
                </div>

                {collection.status !== "VERIFIED" &&
                  collection.status !== "PUBLISHED" &&
                  collection.author.id === user?.id &&
                  !view && (
                    <button onClick={() => handleRemoveItem(item)}>
                      Remove Item
                    </button>
                  )}
              </div>
            </>
          );
        })}
      </div>
    </section>
  );
}
