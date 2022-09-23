/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React, { useState } from "react";
import NextImage from "../Image";
import styles from "./index.module.scss";
import Link from "../Link";
import AddToCollectionDialog from "../AddToCollectionDialog";
import { IUser } from "../../types/user.interface";
import { IItem } from "../../types/item.interface";

interface ItemCardProps {
  id: number;
  img: string;
  name: string;
  price: number;
  ownerAvatar: string;
  highestBid: string;
  item?: IItem;
  collectionImages?: string[];
  owner?: IUser;
  isCollectionAdmin?: boolean;
}

function ItemCard(props: ItemCardProps) {
  const [openDialog, setOpenDialog] = useState(false);
  const handleDialogClose = () => {
    setOpenDialog(false);
  };
  const addItems = () => {};
  const handleAddToCollection = () => {
    setOpenDialog(true);
  };
  const router = useRouter();
  const isMarketplace = router.pathname === "/marketplace";
  return (
    <div>
      <AddToCollectionDialog
        open={openDialog}
        handleClose={handleDialogClose}
        handleRequest={addItems}
        title={props.name}
        id={props.id}
        owner={props.owner}
      />

      <div
        className={
          isMarketplace ? styles.cardBackground : styles.previewcardcontentcon
        }
      >
        <Link href={`/item/${props.id}`}>
          <a>
            <div className={styles.previewcardimg}>
              <Link href={`/item/${props.id}`}>
                <img alt="product image" src={props.img} />
              </Link>
            </div>
            {props.collectionImages && (
              <div className={styles.collectionsimgs}>
                {props.collectionImages.map((item: string, index: number) => (
                  <NextImage
                    className={styles.image}
                    key={index}
                    src={item}
                    width="100%"
                    height="60px"
                  />
                ))}
              </div>
            )}
            <div className={styles.previewcardnamebox}>
              <span>{props.name}</span>
              {!props.collectionImages && (
                <div className={styles.previewcardprice}>
                  <span>{props.price} ETH</span>
                </div>
              )}
            </div>
          </a>
        </Link>
        {!props.collectionImages &&
          props.isCollectionAdmin &&
          !props?.item?.collectionId && (
            <button onClick={handleAddToCollection}>
              Add item to collection
            </button>
          )}
      </div>
    </div>
  );
}
export default ItemCard;
