import { Avatar } from "@mui/material";
import styles from "./PlaceBid.module.scss";

export default function PlaceBid() {
  return (
    <div className={styles.placebid}>
      <section className={styles.top}>
        <Avatar
          src={`/assets/auctionAvatar.png`}
          alt="creator-photo"
          sx={{ width: 50, height: 50 }}
        />
        <div>
          <h5>No Bids</h5>
        </div>
      </section>
      <section className={styles.button}>
        <button>Purchase now</button>
        <button>place a bid</button>
      </section>
      <p>
        <strong>Service fee</strong>
        <span>2.563 ETH</span>
        <span>$4,540.62</span>
      </p>
    </div>
  );
}
