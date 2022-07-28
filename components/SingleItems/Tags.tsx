import { Avatar } from "@mui/material";
import { useState } from "react";
import AcceptBid from "./AcceptBid";
import PlaceBid from "./PlaceBid";
import styles from "./Tags.module.scss";

const InfoComponent = () => {
  return (
    <div className={styles.profileInfoCard}>
      <Avatar
        src={`/assets/auctionAvatar.png`}
        alt="creator-photo"
        sx={{ width: 50, height: 50 }}
      />
      <div>
        <span>Creator</span>
        <span>Sarah Shaibu</span>
      </div>
    </div>
  );
};

export default function Tags({ isOwner }: any) {
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
          <InfoComponent />
          {isOwner ? <AcceptBid /> : <PlaceBid />}
        </>
      )}
      {tag === 3 && isOwner && <AcceptBid noview={true} />}
    </>
  );
}
