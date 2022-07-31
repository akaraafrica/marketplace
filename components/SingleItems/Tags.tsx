import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import AcceptBid from "./AcceptBid";
import PlaceBid from "./PlaceBid";
import styles from "./Tags.module.scss";

const InfoComponent = ({ profile }: any) => {
  return (
    <div className={styles.profileInfoCard}>
      <Avatar
        src={profile.avatar}
        alt="creator-photo"
        sx={{ width: 50, height: 50 }}
      />
      <div>
        <span>Creator</span>
        <span>{profile?.name}</span>
      </div>
    </div>
  );
};

export default function Tags({ item }: any) {
  const [address, setAddrress] = useState<null | string>(null);
  useEffect(() => {
    const address = localStorage.getItem("address");
    address && setAddrress(address);
  }, []);

  const isOwner = item.owner.walletAddress === address;

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
          <InfoComponent profile={item?.owner?.profile || ""} />
          {isOwner ? <AcceptBid /> : <PlaceBid item={item} />}
        </>
      )}
      {tag === 3 && isOwner && <AcceptBid noview={true} />}
    </>
  );
}
