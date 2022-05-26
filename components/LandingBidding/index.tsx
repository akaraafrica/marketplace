import React, { useEffect } from "react";
import Plyr from "plyr-react";
import styles from "./styles.module.scss";
import BidCard from "../BidCard";

const LandingBidding = () => {
  const videoSrc = {
    type: "video",
    sources: [
      {
        src: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
    ],
  };

  useEffect(() => {
    document.querySelector(".videoSec video").setAttribute("poster", `/assets/01.png`);
  }, [`poster`]);

  return (
    <div className={styles.videoSec}>
      <Plyr
        source={`https://www.w3schools.com/html/mov_bbb.mp4`}
        options={{
          rewind: false,
        }}
      />
      <BidCard />
    </div>
  );
};

export default LandingBidding;
