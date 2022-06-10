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

      // @ts-ignore
      document.querySelector("#videoSec video").setAttribute("poster", `/assets/01.png`);
    
  }, []);

  return (
    <div id="videoSec" className={styles.videoSec}>
      <Plyr
        src={`https://www.w3schools.com/html/mov_bbb.mp4`}
        width={500}
        height={500}
        options={{
        //  rewind: false,
        }}
      />
      <BidCard />
    </div>
  );
};

export default LandingBidding;
