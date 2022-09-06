import { Avatar } from "@mui/material";
import { useState, useContext } from "react";
import { IUser } from "../../types/user.interface";
import { AuthContext } from "../../contexts/AuthContext";
import AcceptBid from "./AcceptBid";
import PlaceBid from "./PlaceBid";
import styles from "./Tags.module.scss";
import Link from "../Link";
import { IItem } from "../../types/item.interface";
import AuctionDialog from "./AuctionDialog";
import { AuctionDs } from "../../ds";
import { toast } from "react-toastify";

interface infoProperties {
  user: IUser;
  item: IItem;
}
const InfoComponent = ({ user: Itemuser, item }: infoProperties) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const { user } = useContext(AuthContext);

  const handleDelete = async () => {
    try {
      await AuctionDs.deleteData({
        id: item.auction.id,
      });
      toast.success("Auction deleted");
      handleClose();
    } catch (error) {
      toast.error("Error deleting auction");
    }
  };
  return (
    <div className={styles.profileInfoCard}>
      {open && (
        <AuctionDialog
          open={open}
          handleClose={handleClose}
          item={item}
          edit={item?.auction?.open ? true : false}
        />
      )}
      <div>
        <Avatar
          src={Itemuser.profile?.avatar}
          alt="creator-photo"
          sx={{ width: 50, height: 50 }}
        />
        <Link href={`/profile/${Itemuser.id}`}>
          <div>
            <span>Creator</span>
            <span>{Itemuser.profile?.name}</span>
          </div>
        </Link>
      </div>
      {user && (
        <div className={styles.buttons}>
          {user.id === Itemuser.id && (
            <button onClick={() => setOpen(true)}>
              {item?.auction?.open ? "edit auction" : `place on auction`}
            </button>
          )}
          {item?.auction?.open && (
            <button className={styles.close} onClick={handleDelete}>
              close auction
            </button>
          )}
        </div>
      )}
    </div>
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
        {/* <span
          onClick={() => setTag(1)}
          className={` ${tag === 1 ? styles.active : ""}`}
        >
          Owners
        </span> */}
        {/* <span
          onClick={() => setTag(2)}
          className={` ${tag === 2 ? styles.active : ""}`}
        >
          History
        </span> */}
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
          {item?.auction?.open &&
            (isOwner ? (
              <AcceptBid item={item} setTag={setTag} />
            ) : (
              <PlaceBid item={item} />
            ))}
        </>
      )}
      {tag === 3 && isOwner && <AcceptBid viewall={true} item={item} />}
    </>
  );
}
