import { Avatar } from "@mui/material";
import styles from "./AcceptBid.module.scss";

export default function AcceptBid({ noview }: any) {
  return (
    <div className={styles.acceptbid}>
      <section className={styles.top}>
        <Avatar
          src={`/assets/auctionAvatar.png`}
          alt="creator-photo"
          sx={{ width: 50, height: 50 }}
        />
        <div>
          <h5>
            {!noview && <>Highest bid by </>}
            <span>Kohaku Tora</span>
          </h5>
          <h3>
            <span>1.46 ETH</span>
            $2,764.89
          </h3>
        </div>
      </section>
      <section className={styles.button}>
        {!noview && <button>View all</button>}
        <button className={styles.accept}>Accept</button>
      </section>
    </div>
  );
}
