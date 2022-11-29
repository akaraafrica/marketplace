import { Avatar } from "@mui/material";
import { useState, useContext } from "react";
import { IUser } from "../../../types/user.interface";
import { AuthContext } from "../../../contexts/AuthContext";
import AcceptBid from "../AcceptBid";
import PlaceBid from "../PlaceBid";
import styles from "./index.module.scss";
import Link from "../../global/Link";
import { IItem } from "../../../types/item.interface";
import Index from "../AuctionDialog";
import DefaultAvatar from "../../global/DefaultAvatar";
import { getUserName } from "../../../utils/helpers/getUserName";
import { useSWRConfig } from "swr";
import LeaveCollectionDialog from "../LeaveCollectionDialog";
import PutOnSaleDialog from "../PutOnSaleDialog";
import { MdCancel, MdEdit } from "react-icons/md";
import parse from "html-react-parser";
import CloseAuctionDialog from "../CloseAuctionDialog";
import { RiAuctionFill } from "react-icons/ri";

interface infoProperties {
  user: IUser;
  item: IItem;
}
const InfoComponent = ({ user: Itemuser, item }: infoProperties) => {
  const [open, setOpen] = useState(false);
  const [openLeaveCollection, setOpenLeaveCollection] = useState(false);
  const [openPutOnSale, setOpenPutOnSale] = useState(false);
  const [openCloseAuction, setOpenCloseAuction] = useState(false);

  const handleClose = () => setOpen(false);
  const { user } = useContext(AuthContext);

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
      <CloseAuctionDialog
        open={openCloseAuction}
        handleClose={() => {
          setOpenCloseAuction(false);
        }}
        item={item}
      />
      {open && (
        <Index
          open={open}
          handleClose={handleClose}
          item={item}
          edit={item?.auction?.open ? true : false}
        />
      )}
      <div>
        <div className={styles.profileInfoCard}>
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
          <div className={styles.desc}>
            <div>{item && parse(item.description)}</div>
          </div>
        </div>
        {user && (
          <>
            <div className={styles.buttons}>
              {item.ownerId === user.id && (
                <div onClick={() => setOpenPutOnSale(true)}>
                  <label className={styles.switch}>
                    <input type="checkbox" checked={item?.published} readOnly />
                    <div className={`${styles.slider} ${styles.round}`}></div>
                  </label>
                  <strong>place on sale</strong>
                </div>
              )}

              <div>
                {user.id === Itemuser.id && (
                  <span onClick={() => setOpen(true)}>
                    {item?.auction?.open ? (
                      <>
                        <MdEdit size={30} />
                        edit auction
                      </>
                    ) : (
                      <>
                        <RiAuctionFill size={25} />
                        place on auction
                      </>
                    )}
                  </span>
                )}

                {item?.auction?.open && item.ownerId === user.id && (
                  <span onClick={() => setOpenCloseAuction(true)}>
                    <MdCancel size={30} color="orangered" />
                    close auction
                  </span>
                )}
              </div>

              {user.id === Itemuser.id &&
                item.collectionId &&
                !item?.auction?.open && (
                  <span
                    className={styles.leave}
                    onClick={() => setOpenLeaveCollection(true)}
                  >
                    <MdCancel size={30} color="orangered" />
                    leave collection
                  </span>
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
        {isOwner && item.bids.length > 0 && (
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
