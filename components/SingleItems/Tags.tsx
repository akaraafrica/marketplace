import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { IUser } from "../../types/user.interface";
import AcceptBid from "./AcceptBid";
import PlaceBid from "./PlaceBid";
import styles from "./Tags.module.scss";
import Link from "../Link";
import { IItem } from "../../types/item.interface";

interface infoProperties {
  user: IUser;
}
const InfoComponent = ({ user }: infoProperties) => {
  return (
    <div className={styles.profileInfoCard}>
      <Avatar
        src={user.profile?.avatar}
        alt="creator-photo"
        sx={{ width: 50, height: 50 }}
      />
      <Link href={`/profile/${user.id}`}>
        <div>
          <span>Creator</span>
          <span>{user.profile?.name}</span>
        </div>
      </Link>
    </div>
  );
};

export default function Tags({ item }: { item: IItem }) {
  const isOwner = item?.owner?.id === 221;
  const [address, setAddrress] = useState<null | string>(null);
  useEffect(() => {
    const address = localStorage.getItem("address");
    address && setAddrress(address);
  }, []);

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
          <InfoComponent user={item.owner} />
          {isOwner ? <AcceptBid /> : <PlaceBid item={item} />}
        </>
      )}
      {tag === 3 && isOwner && <AcceptBid noview={true} />}
    </>
  );
}
