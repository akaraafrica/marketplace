import { Avatar } from "@mui/material";
import { useState, useContext } from "react";
import { IUser } from "../../../types/user.interface";
import { AuthContext } from "../../../contexts/AuthContext";
import ViewBid from "../ViewBid";
import PlaceBid from "../PlaceBid";
import styles from "./index.module.scss";
import Link from "../../global/Link";
import { IItem } from "../../../types/item.interface";
import Index from "../AuctionDialog";
import DefaultAvatar from "../../global/DefaultAvatar";
import { getUserName } from "../../../utils/helpers/getUserName";
import LeaveCollectionDialog from "../LeaveCollectionDialog";
import PutOnSaleDialog from "../PutOnSaleDialog";
import PutAuctionDialog from "../PutAuctionDialog";
import { MdCancel, MdEdit } from "react-icons/md";
import parse from "html-react-parser";
import CloseAuctionDialog from "../CloseAuctionDialog";
import { RiAuctionFill } from "react-icons/ri";
import CountdownTimer from "../CountdownTimer";
import { differenceInSeconds, isPast } from "date-fns";

interface infoProperties {
  user: IUser;
  item: IItem;
}
const InfoComponent = ({ user: Itemuser, item }: infoProperties) => {
  const [open, setOpen] = useState(false);
  const [openAuction, setOpenAuction] = useState(false);
  const [openLeaveCollection, setOpenLeaveCollection] = useState(false);
  const [openPutOnSale, setOpenPutOnSale] = useState(false);
  const [openCloseAuction, setOpenCloseAuction] = useState(false);

  const handleClose = () => setOpen(false);
  const { user } = useContext(AuthContext);
  const auctionHasEnd =
    isPast(new Date(item.auction?.endTime)) || !item.auction?.open;
  const auctionHasStart =
    differenceInSeconds(new Date(item.auction?.startTime), new Date()) < 0;

  const auctionStartDate = new Date(item?.auction?.startTime).getTime();
  const auctionEndDate = new Date(item?.auction?.endTime).getTime();

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

      <PutAuctionDialog
        open={openAuction}
        handleClose={() => {
          setOpenAuction(false);
        }}
        item={item}
        setOpen={setOpen}
      />
      <Index
        open={open}
        handleClose={handleClose}
        item={item}
        edit={item?.auction?.open ? true : false}
      />
      <div>
        <div className={styles.profileInfoCard}>
          <Link href={`/profile/${Itemuser.id}`}>
            <div className={styles.avatar}>
              <DefaultAvatar
                username={Itemuser.username}
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
        {user && !item?.auction?.open && (
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
                {user.id === Itemuser.id && item.published && (
                  <span onClick={() => setOpenAuction(true)}>
                    <RiAuctionFill size={25} />
                    place on auction
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
        {!auctionHasEnd && (
          <div>
            <h5 className={styles.headiing}>
              {auctionHasStart ? "Auction Ending" : "Auction Starting"}
            </h5>
            <CountdownTimer
              targetDate={auctionHasStart ? auctionEndDate : auctionStartDate}
            />
          </div>
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
            ? item?.auction?.open && <ViewBid item={item} setTag={setTag} />
            : user && <PlaceBid item={item} />}
        </>
      )}
      {tag === 3 && isOwner && <ViewBid viewall={true} item={item} />}
    </>
  );
}
