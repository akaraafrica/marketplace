import { Avatar } from "@mui/material";
import { useState, useContext } from "react";
import { IUser } from "../../../types/user.interface";
import { AuthContext } from "../../../contexts/AuthContext";
import AcceptBid from "../AcceptBid";
import PlaceBid from "../PlaceBid";
import styles from "./index.module.scss";
import Link from "../../Link";
import { IItem } from "../../../types/item.interface";
import Index from "../AuctionDialog";
import { AuctionDs, ItemDs } from "../../../ds";
import { toast } from "react-toastify";
import DefaultAvatar from "../../DefaultAvatar";
import { getUserName } from "../../../utils/helpers/getUserName";
import { useSWRConfig } from "swr";
import LeaveCollectionDialog from "../LeaveCollectionDialog";
import PutOnSaleDialog from "../PutOnSaleDialog";

interface infoProperties {
  user: IUser;
  item: IItem;
}
const InfoComponent = ({ user: Itemuser, item }: infoProperties) => {
  const [open, setOpen] = useState(false);
  const [openLeaveCollection, setOpenLeaveCollection] = useState(false);
  const [openPutOnSale, setOpenPutOnSale] = useState(false);

  const handleClose = () => setOpen(false);
  const { user } = useContext(AuthContext);
  const { mutate } = useSWRConfig();

  const isContributor = item?.collection?.contributors?.find(
    (con) => con.user.walletAddress === user?.walletAddress
  );

  const handleDelete = async () => {
    try {
      await AuctionDs.deleteData({
        id: item.auction.id,
      });
      mutate(["item", item.id]);

      toast.success("Auction deleted");
      handleClose();
    } catch (error) {
      toast.error("Error deleting auction");
    }
  };

  return (
    <>
      <LeaveCollectionDialog
        open={openLeaveCollection}
        handleClose={() => {
          setOpenLeaveCollection(false);
        }}
        item={item}
      />
      <PutOnSaleDialog
        open={openPutOnSale}
        handleClose={() => {
          setOpenPutOnSale(false);
        }}
        item={item}
      />
      <div className={styles.profileInfoCard}>
        {open && (
          <Index
            open={open}
            handleClose={handleClose}
            item={item}
            edit={item?.auction?.open ? true : false}
          />
        )}
        <div>
          <Link href={`/profile/${Itemuser.id}`}>
            <div className={styles.avatar}>
              <DefaultAvatar
                id={Itemuser.id}
                walletAddress={Itemuser.walletAddress!}
                url={Itemuser.profile?.avatar}
              />
              <div>
                <span>{getUserName(Itemuser)}</span>
              </div>
            </div>
          </Link>
        </div>
        {user && (
          <>
            <div className={styles.buttons}>
              {user.id === Itemuser.id &&
                (!item.collectionId || isContributor) && (
                  <button onClick={() => setOpen(true)}>
                    {item?.auction?.open ? "edit auction" : `place on auction`}
                  </button>
                )}

              {item?.auction?.open && item.ownerId === user.id && (
                <button className={styles.close} onClick={handleDelete}>
                  close auction
                </button>
              )}
              {item.ownerId === user.id &&
                (!item.collectionId || isContributor) && (
                  <button
                    className={item.published ? styles.leave : styles.close}
                    onClick={() => setOpenPutOnSale(true)}
                  >
                    {item.published ? "remove from sale" : "placed on sale"}
                  </button>
                )}
              {user.id === Itemuser.id &&
                item.collectionId &&
                !item?.auction?.open &&
                !isContributor && (
                  <button
                    className={styles.leave}
                    onClick={() => setOpenLeaveCollection(true)}
                  >
                    leave collection
                  </button>
                )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default function Tags({ item }: { item: IItem }) {
  const { user } = useContext(AuthContext);
  const isOwner = item?.owner?.id === user?.id;

  const [tag, setTag] = useState(0);
  return (
    <>
      <div className={styles.main}>
        <span
          onClick={() => setTag(0)}
          className={`${tag === 0 ? styles.active : ""}`}
        >
          Info
        </span>
        {isOwner && (
          <span
            onClick={() => setTag(3)}
            className={` ${tag === 3 ? styles.active : ""}`}
          >
            Bids
          </span>
        )}
      </div>
      {tag === 0 && (
        <>
          <InfoComponent user={item.owner} item={item} />

          {isOwner
            ? item?.auction?.open && <AcceptBid item={item} setTag={setTag} />
            : user && <PlaceBid item={item} />}
        </>
      )}
      {tag === 3 && isOwner && <AcceptBid viewall={true} item={item} />}
    </>
  );
}
